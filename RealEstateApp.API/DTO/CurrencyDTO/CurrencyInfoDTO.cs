using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.CurrencyDTO
{
    public class CurrencyInfoDTO : EstateParameterBaseDTO
    {
        public int Id { get; set; }
        public double ValueAsTl { get; set; }

        public CurrencyInfoDTO(Currency currency) 
        {
            Id = currency.Id;
            Name = currency.Name;
            ValueAsTl = currency.ValueAsTl;
        }
    }
}
