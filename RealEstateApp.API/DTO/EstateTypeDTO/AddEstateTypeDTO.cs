using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.EstateTypeDTO
{
    public class AddEstateTypeDTO : EstateParameterBaseDTO
    {
        public EstateType ToEstateType()
        {
            return new EstateType
            {
                Name = this.Name
            };
        }
    }
}
