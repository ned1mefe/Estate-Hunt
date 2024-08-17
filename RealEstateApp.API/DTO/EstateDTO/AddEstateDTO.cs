using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.EstateDTO
{
    public class AddEstateDTO : BaseEstateDTO
    {
        public Estate ToEstate()
        {
            return new Estate
            {
                OwnerId = OwnerId,

                Title = Title,
                Description = Description,

                CurrencyId = CurrencyId,
                StatusId = StatusId,
                TypeId = EstateTypeId,
                Price = Price,

                EndDate = EndDate,
                StartDate = StartDate
            };
        }
    }
}
