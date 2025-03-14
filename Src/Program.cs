using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using Src.Authorization;
using Src.Models;
using Src.Repositories;
using Src.Services;
using Microsoft.AspNetCore.RateLimiting;
using Src.Middleware;

var builder = WebApplication.CreateBuilder(args);
// if (builder.Environment.IsDevelopment())
// {
    builder.Configuration.AddUserSecrets<Program>();
// }

// Add environment variables as a configuration source
builder.Configuration.AddEnvironmentVariables();

// Get MongoDB settings from user secrets/configuration
var mongoUser = builder.Configuration["MONGO_USER"] ?? throw new InvalidOperationException("MONGO_USER is not configured in user secrets");
var mongoPassword = builder.Configuration["MONGO_PASSWORD"] ?? throw new InvalidOperationException("MONGO_PASSWORD is not configured in user secrets");
var jwtSecret = builder.Configuration["JWT_SECRET"] ?? throw new InvalidOperationException("JWT_SECRET is not configured in user secrets");

// Configure MongoDB connection string
// MongoDB connection string with required credentials
var mongoHost = builder.Environment.IsDevelopment() ? "localhost" : "localhost";
var mongoConnectionString = $"mongodb://{mongoUser}:{mongoPassword}@{mongoHost}:27017/?authSource=admin&authMechanism=SCRAM-SHA-1";

// Configure MongoDB settings
builder.Services.Configure<MongoDbSettings>(options =>
{
    options.ConnectionString = mongoConnectionString;
    options.Database = builder.Configuration["MongoDB:Database"] ?? "GoalsDb";
});

// Configure JWT settings
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "habit-api";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "habit-client";

builder.Services.Configure<JwtSettings>(options =>
{
    options.Issuer = jwtIssuer;
    options.Audience = jwtAudience;
    options.Key = jwtSecret;
});

var jwtSettings = new JwtSettings
{
    Issuer = jwtIssuer,
    Audience = jwtAudience,
    Key = jwtSecret
};

BsonSerializer.RegisterSerializer(new GuidSerializer(BsonType.String));

// Register services
builder.Services.AddScoped<IGoalService, GoalService>();
builder.Services.AddScoped<IGoalRepository, GoalRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IMongoDbInitializer, MongoDbInitializer>();
builder.Services.AddSingleton<IJwtService, JwtService>();

// Add Authorization with policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireUserAuth", policy =>
        policy.Requirements.Add(new UserAuthRequirement()));
});

// Register the authorization handler
builder.Services.AddScoped<IAuthorizationHandler, UserAuthHandler>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
        };
    });

// Add rate limiting
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.User?.Identity?.Name ?? context.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                Window = TimeSpan.FromMinutes(1)
            }));

    options.AddPolicy("AuthLimit", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? context.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1)
            }));
});

builder.Services.AddControllersWithViews();
var app = builder.Build();

// Initialize MongoDB indexes
using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<IMongoDbInitializer>();
    await initializer.InitializeAsync();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

if (!Directory.Exists(app.Environment.WebRootPath))
{
    Directory.CreateDirectory(app.Environment.WebRootPath);
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Only apply UserAuthMiddleware to /api routes
app.UseWhen(context => context.Request.Path.StartsWithSegments("/api"), appBuilder =>
{
    appBuilder.UseMiddleware<UserAuthMiddleware>();
});

// Add rate limiting middleware
app.UseRateLimiter();

app.MapFallbackToController("Index", "Home");
            
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
