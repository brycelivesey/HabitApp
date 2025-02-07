namespace Src.Services
{
    public class ManifestEntry
    {
        public string file { get; set; } = "";
        public string name { get; set; } = "";
        public string src { get; set; } = "";
        public bool isEntry { get; set; }
        public string[] css { get; set; } = [];
    }

    public static class ManifestServices
    {
        private static Dictionary<string, ManifestEntry>? _manifestCache;
    
        public static ManifestEntry? GetManifestItem(string key)
        {
            if (_manifestCache == null)
            {
                var manifestPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", ".vite", "manifest.json");
                if (File.Exists(manifestPath))
                {
                    var manifestJson = File.ReadAllText(manifestPath);
                    _manifestCache = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, ManifestEntry>>(manifestJson);
                }
            }

            return _manifestCache?.GetValueOrDefault(key);
        }
    }
}