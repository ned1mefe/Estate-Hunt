using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.EstateTypeDTO
{
    public class EstateTypeInfoDTO: EstateParameterBaseDTO
    {
        public int Id { get; set; }

        public EstateTypeInfoDTO(EstateType eType)
        {
            Name = eType.Name;
            Id = eType.Id;
        }
    }
}
