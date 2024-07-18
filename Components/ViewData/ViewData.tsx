using Microsoft.AspNetCore.Mvc;
 
namespace PIR.API.Controllers
{
 
    public class AdminstartionDTO
    {
        public int SystemID { get; set; }
        public int PIRID { get; set; }
        public string? SystemName { get; set; }
		public DateTime StartTime { get; set; } 
		public DateTime EndTime { get; set; }   
		public string? Country { get; set; }
        public bool IsActive { get; set; }
    }
    [ApiController]
    [Route("api/[controller]")]
    public class AdminstrationController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<AdminstartionDTO>> GetSystemInfo()
        {
            List<AdminstartionDTO> systemInfoList = new List<AdminstartionDTO>
            {
                new AdminstartionDTO {
                    SystemID = 1,
                    PIRID = 1,
                    SystemName = "Reflect",
                    Country = "Jordan",
					StartTime = new DateTime(2024, 7, 18, 8, 0, 0),
					EndTime = new DateTime(2024, 7, 18, 17, 0, 0), 
                    IsActive = true 
                },
                new AdminstartionDTO { SystemID = 1,
                    PIRID = 1,
                    SystemName = "Reflect",
                    Country = "Jordan",
					StartTime = new DateTime(2024, 7, 18, 8, 0, 0),
					EndTime = new DateTime(2024, 7, 18, 17, 0, 0), 
                    IsActive = true
                },
                new AdminstartionDTO {SystemID = 1,
                    PIRID = 1,
                    SystemName = "Reflect",
                    Country = "Jordan",
					StartTime = new DateTime(2024, 7, 18, 8, 0, 0),
					EndTime = new DateTime(2024, 7, 18, 17, 0, 0), 
                    IsActive = true 
                },
                new AdminstartionDTO {SystemID = 1,
                    PIRID = 1,
                    SystemName = "Reflect",
                    Country = "Jordan",
					StartTime = new DateTime(2024, 7, 18, 8, 0, 0),
					EndTime = new DateTime(2024, 7, 18, 17, 0, 0), 
                    IsActive = false 
                },
                new AdminstartionDTO { SystemID = 1,
                    PIRID = 1,
                    SystemName = "Reflect",
                    Country = "Jordan",
					StartTime = new DateTime(2024, 7, 18, 8, 0, 0),
					EndTime = new DateTime(2024, 7, 18, 17, 0, 0), 
                    IsActive = false
                }
            };
 
            return Ok(systemInfoList);
        }
    }
}
