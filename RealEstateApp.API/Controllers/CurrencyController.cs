using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.API.Context;
using RealEstateApp.API.DTO.CurrencyDTO;

namespace RealEstateApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly RealEstateContext _context;
        public CurrencyController(RealEstateContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get(int id) 
        {
            var currency = _context.Currencies.FirstOrDefault(x => x.Id == id && !x.IsDeleted);
            if (currency == null) 
                return NotFound();

            return Ok(new CurrencyInfoDTO(currency));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var currency = _context.Currencies.FirstOrDefault(x=> x.Id == id && !x.IsDeleted);
            if (currency == null) 
                return NotFound();

            currency.IsDeleted = true;
            _context.SaveChanges();

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public IActionResult Post(AddCurrencyDTO dto)
        {
            var response = _context.Currencies.Add(dto.ToCurrency());
            _context.SaveChanges();

            return Ok(new CurrencyInfoDTO(response.Entity));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut]
        public IActionResult Put(EditCurrencyDTO dto)
        {
            var currency = _context.Currencies.FirstOrDefault(x => x.Id == dto.Id && !x.IsDeleted);

            if (currency == null)
                return NotFound();

            currency.Name = dto.Name;
            currency.ValueAsTl = dto.ValueAsTl;
            _context.SaveChanges();

            return Ok(new CurrencyInfoDTO(currency));
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetAll()
        {
            var currencies = _context.Currencies.Where(x => !x.IsDeleted);

            if (!currencies.Any())
                return NotFound();

            var result = new List<CurrencyInfoDTO>();

            foreach (var cur in currencies)
                result.Add(new CurrencyInfoDTO(cur));


            return Ok(result);
        }

    }
}
