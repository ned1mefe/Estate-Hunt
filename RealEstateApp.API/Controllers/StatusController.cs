using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.API.Context;
using RealEstateApp.API.DTO.StatusDTO;

namespace RealEstateApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly RealEstateContext _context;

        public StatusController(RealEstateContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get(int id)
        {
            var status = _context.Statuses.FirstOrDefault(x => x.Id == id && !x.IsDeleted);

            if (status == null)
                return NotFound();

            return Ok(new StatusInfoDTO(status));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete]
        public IActionResult Delete(int id) 
        { 
            var status = _context.Statuses.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            if (status == null)
                return NotFound();

            status.IsDeleted = true;
            _context.SaveChanges();

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public IActionResult Post([FromBody] AddStatusDTO dto)
        {
            var response = _context.Statuses.Add(dto.ToStatus());
            _context.SaveChanges();

            return Ok(new StatusInfoDTO(response.Entity));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut]
        public IActionResult Put([FromBody] EditStatusDTO dto)
        {
            var id = dto.Id;
            var name = dto.Name;
            var status = _context.Statuses.FirstOrDefault(x => x.Id == id && !x.IsDeleted);

            if (status == null)
                return NotFound();

            status.Name = name;
            _context.SaveChanges();

            return Ok(new StatusInfoDTO(status));
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetAll() 
        {
            var statuses = _context.Statuses.Where(x => !x.IsDeleted);
            
            if (!statuses.Any())
                return NotFound();

            List<StatusInfoDTO> result = new List<StatusInfoDTO>();
            
            foreach (var stat in statuses)
                result.Add(new StatusInfoDTO(stat));


            return Ok(result);
        }
    }
}
