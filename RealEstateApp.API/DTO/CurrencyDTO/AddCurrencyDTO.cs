using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.CurrencyDTO
{
    public class AddCurrencyDTO : EstateParameterBaseDTO
    {
        public double ValueAsTl { get; set; }

        public Currency ToCurrency()
        {
            return new Currency
            {
                Name = this.Name,
                ValueAsTl = this.ValueAsTl,
            };
        }
    }
}
