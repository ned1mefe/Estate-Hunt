using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.API.Context;
using RealEstateApp.API.DTO;
using RealEstateApp.API.DTO.EstateDTO;
using RealEstateApp.API.Entities;
using System.Security.Claims;

namespace RealEstateApp.API.Controllers
{
    [Authorize(Roles ="Administrator,User")]
    [Route("api/[controller]")]
    [ApiController]
    public class EstateController : ControllerBase
    {
        private readonly RealEstateContext _context;
        private const int _estateCountInPage = 12;
        private const int _estateCountInFirstPage = 4;

        public EstateController(RealEstateContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get(int id)
        {
            var estate = _context.Estates.Include(e => e.Owner)
                                         .Include(e => e.Status)
                                         .Include(e => e.Type)
                                         .Include(e => e.Currency)
                                         .FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            if (estate == null)
                return NotFound();

            return Ok(new EstateInfoDTO(estate));
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var estate = _context.Estates.FirstOrDefault(x => x.Id == id && !x.IsDeleted);

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var userIsAdmin = User.IsInRole("Administrator");

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            if (estate == null)
                return NotFound();

            if (!userIsAdmin && (estate.OwnerId != userIdClaim.Value))
            {
                return Unauthorized("Users cannot edit other users estates.");

            }

            estate.IsDeleted = true;

            var images = _context.Images.Where(x => x.EstateId == id).ToList();

            foreach (var image in images)
            {
                image.IsDeleted = true;
                // Should better be deleting them all from the database,
                // Since my intent was to save unused space
            }

            _context.SaveChanges();

            return NoContent();
        }

        [HttpPost]
        public IActionResult Post([FromBody] AddEstateDTO dto)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            var userId = userIdClaim.Value;
            
            dto.OwnerId = userId;

            var response = _context.Estates.Add(dto.ToEstate());
            _context.SaveChanges();

            return Ok(response.Entity.Id);
        }

        [HttpPut]
        public IActionResult Put([FromBody] EditEstateDTO dto)
        {
            var estate = _context.Estates.FirstOrDefault(x => x.Id == dto.Id && !x.IsDeleted);

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var userIsAdmin = User.IsInRole("Administrator");

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            if (estate == null)
                return NotFound();

            if (!userIsAdmin && (estate.OwnerId != userIdClaim.Value) )
            {
                return Unauthorized("Users cannot edit other users estates.");

            }

            estate.Title = dto.Title;
            estate.Description = dto.Description;
            
            estate.CurrencyId = dto.CurrencyId;
            estate.StatusId = dto.StatusId;
            estate.TypeId = dto.EstateTypeId;
            estate.Price = dto.Price;

            estate.StartDate = dto.StartDate;
            estate.EndDate = dto.EndDate;

            _context.SaveChanges();

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("page")]
        public IActionResult GetEstatePage(int page, int? statusId = null, int? typeId = null, int? currencyId = null)
        {
            int low;
            int estateCountInPage;

            if (page == 0) // Homepage shows first 4 estates
            {
                low = 0;
                estateCountInPage = _estateCountInFirstPage;
            }
            else // first page also shows 4 + 8 estates
            {
                low = (page - 1) * _estateCountInPage;
                estateCountInPage = _estateCountInPage;
            }

            var estatesQuery = _context.Estates.Include(e => e.Owner)
                                               .Include(e => e.Status)
                                               .Include(e => e.Type)
                                               .Include(e => e.Currency)
                                               .Where(x => !x.IsDeleted);

            if (statusId.HasValue)
            {
                estatesQuery = estatesQuery.Where(x => x.StatusId == statusId.Value);
            }

            if (typeId.HasValue)
            {
                estatesQuery = estatesQuery.Where(x => x.TypeId == typeId.Value);
            }

            if (currencyId.HasValue)
            {
                estatesQuery = estatesQuery.Where(x => x.CurrencyId == currencyId.Value);
            }

            var filteredEstates = estatesQuery.ToList();

            var pageCount = (int)Math.Ceiling((double)filteredEstates.Count / _estateCountInPage);

            // Check if the requested page is valid
            if (page > pageCount || page < 0)
            {
                return NotFound();
            }

            estateCountInPage = (filteredEstates.Count < low + estateCountInPage) ? (filteredEstates.Count - low) : estateCountInPage;

            var estates = filteredEstates.Skip(low).Take(estateCountInPage).ToList();

            List<EstateInfoDTO> list = estates.Select(estate => new EstateInfoDTO(estate)).ToList();

            var result = new PageDTO()
            {
                totalPages = pageCount,
                estates = list,
            };

            return Ok(result);
        }



        [AllowAnonymous]
        [HttpGet]
        [Route("list")]
        public IActionResult GetAll()
        {
            var estates = _context.Estates.Include(e => e.Owner)
                                          .Include(e => e.Status)
                                          .Include(e => e.Type)
                                          .Include(e => e.Currency)
                                          .Where(x => !x.IsDeleted);

            if (!estates.Any())
                return NotFound();

            List<EstateInfoDTO> result = new List<EstateInfoDTO>();

            foreach (var estate in estates)
                result.Add(new EstateInfoDTO(estate));


            return Ok(result);
        }

        
        [Route("listOfUser")]
        [HttpGet]
        public IActionResult GetUsersEstates()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found in token.");
            }

            var userId = userIdClaim.Value;

            var estates = _context.Estates.Include(e => e.Owner)
                                          .Include(e => e.Status)
                                          .Include(e => e.Type)
                                          .Include(e => e.Currency)
                                          .Where(x => !x.IsDeleted && x.Owner.Id == userId);

            if (!estates.Any())
                return NotFound();

            List<EstateInfoDTO> result = new List<EstateInfoDTO>();

            foreach (var estate in estates)
                result.Add(new EstateInfoDTO(estate));


            return Ok(result);
        }

    }
}
