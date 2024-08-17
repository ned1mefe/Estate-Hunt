using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.API.Context;
using RealEstateApp.API.DTO.EstateTypeDTO;

namespace RealEstateApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstateTypeController : ControllerBase
    {
        private readonly RealEstateContext _context;

        public EstateTypeController(RealEstateContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var eType = _context.EstateTypes.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            if (eType == null) 
                return NotFound();

            return Ok(new EstateTypeInfoDTO(eType));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete]
        public IActionResult Delete(int id) 
        {
            var eType = _context.EstateTypes.FirstOrDefault(x => x.Id == id && !x.IsDeleted );
            if (eType == null)
                return NotFound();

            eType.IsDeleted = true;
            _context.SaveChanges();

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public IActionResult Post(AddEstateTypeDTO dto)
        {
            var response = _context.EstateTypes.Add(dto.ToEstateType());
            _context.SaveChanges();

            return Ok(new EstateTypeInfoDTO(response.Entity));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut]
        public IActionResult Put(EditEstateTypeDTO dto)
        {
            var eType = _context.EstateTypes.FirstOrDefault(x => x.Id == dto.Id && !x.IsDeleted);
            
            if (eType == null)
                return NotFound();

            eType.Name = dto.Name;
            _context.SaveChanges();

            return Ok(new EstateTypeInfoDTO(eType));
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetAll()
        {
            var eTypes = _context.EstateTypes.Where(x => !x.IsDeleted);

            if(!eTypes.Any())
                return NotFound();

            var result = new List<EstateTypeInfoDTO>();

            foreach (var eType in eTypes)
                result.Add(new EstateTypeInfoDTO(eType));


            return Ok(result);
        }

    }
}
