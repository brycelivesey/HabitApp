using Microsoft.AspNetCore.Mvc;
using Src.Authorization;
using Src.Models;
using Src.Services;

namespace Src.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    [RequireUserAuth]
    public class GoalsController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalsController(IGoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpPost("goals")]
        public async Task<ActionResult<Guid>> AddGoal([FromBody] DailyGoal goal)
        {
            try 
            {
                var result = await _goalService.AddGoalAsync(Guid.Parse(HttpContext.Items["userId"].ToString()), goal);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpDelete("goals/{id}")]
        public async Task<ActionResult<Guid>> DeleteGoal(Guid id)
        {
            try 
            {
                var result = await _goalService.DeleteGoalAsync(Guid.Parse(HttpContext.Items["userId"].ToString()), id);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPut("goals")]
        public async Task<ActionResult<Guid>> EditGoal([FromBody] DailyGoal goal)
        {
            try 
            {
                var result = await _goalService.UpdateGoalAsync(Guid.Parse(HttpContext.Items["userId"].ToString()), goal);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("goals/{id}/contributions")]
        public async Task<ActionResult<Guid>> AddContribution(Guid id, [FromBody] string date)
        {
            try 
            {
                var result = await _goalService.AddContributionAsync(Guid.Parse(HttpContext.Items["userId"].ToString()), id, date);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpGet("goals")]
        public async Task<ActionResult<DailyGoal>> GetUserGoals()
        {
            try 
            {
                var result = await _goalService.GetUserGoalsAsync(Guid.Parse(HttpContext.Items["userId"].ToString()));
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}