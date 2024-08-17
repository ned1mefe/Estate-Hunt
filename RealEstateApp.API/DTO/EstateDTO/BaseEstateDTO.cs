using System.Data.SqlTypes;

namespace RealEstateApp.API.DTO.EstateDTO
{
    public class BaseEstateDTO
    {
        public string Title {  get; set; }
        public string Description { get; set; }
        public string OwnerId { get; set; }
        public int StatusId { get; set; }
        public int EstateTypeId { get; set;}
        public int CurrencyId { get; set; }
        public int Price { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set;}
    }
}
