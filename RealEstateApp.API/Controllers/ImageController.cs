using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.API.Context;
using RealEstateApp.API.DTO.ImageDTO;
using System.Security.Claims;


namespace RealEstateApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly RealEstateContext _context;
        public ImageController(RealEstateContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var image = _context.Images.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            if (image == null)
                return NotFound();

            return Ok(new ImageInfoDTO(image));
        }

        [HttpDelete]
        [Authorize(Roles ="Administrator,User")]
        public IActionResult Delete(int id) 
        {
            var image = _context.Images.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            
            if (image == null)
                return NotFound();

            var estate = _context.Estates.FirstOrDefault(x => x.Id == image.EstateId && !x.IsDeleted);
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var userIsAdmin = User.IsInRole("Administrator");

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            if (estate == null)
                return BadRequest("Could not find estate.");

            if (!userIsAdmin && (estate.OwnerId != userIdClaim.Value))
            {
                return Unauthorized("Users cannot edit other users estates.");

            }

            image.IsDeleted = true;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles ="Administrator,User")]
        public IActionResult Post(AddImageDTO dto)
        {
            var estate = _context.Estates.FirstOrDefault(x => x.Id == dto.EstateId && !x.IsDeleted);
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var userIsAdmin = User.IsInRole("Administrator");

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            if (estate == null)
                return BadRequest("Could not find estate.");

            if (!userIsAdmin && (estate.OwnerId != userIdClaim.Value))
            {
                return Unauthorized("Users cannot edit other users estates.");

            }
            var response = _context.Images.Add(dto.ToImage());
            _context.SaveChanges();

            return Ok(new ImageInfoDTO(response.Entity));
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,User")]
        [Route("add_multiple")]
        public IActionResult AddMultiple(List<AddImageDTO> dtos)
        {
            if (!dtos.Any())
            {
                return BadRequest("Empty Array");
            }

            var estate = _context.Estates.FirstOrDefault(x => x.Id == dtos[0].EstateId && !x.IsDeleted); //Assumes all dtos have same estateID
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var userIsAdmin = User.IsInRole("Administrator");

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            if (estate == null)
                return BadRequest("Could not find estate.");

            if (!userIsAdmin && (estate.OwnerId != userIdClaim.Value))
            {
                return Unauthorized("Users cannot edit other users estates.");
            }

            foreach (var dto in dtos)
            {
                _context.Images.Add(dto.ToImage());
            }
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetAll(int estateId)
        {
            var images = _context.Images.Where(x => x.EstateId == estateId && !x.IsDeleted);

            if (!images.Any())
                return Ok();

            var result = new List<ImageInfoDTO>();

            foreach (var image in images)
                result.Add(new ImageInfoDTO(image));


            return Ok(result);
        }

    }
}
