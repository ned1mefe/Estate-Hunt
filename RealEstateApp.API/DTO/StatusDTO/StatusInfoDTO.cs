using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.StatusDTO
{
    public class StatusInfoDTO : EstateParameterBaseDTO
    {
        public int Id { get; set; }

        public StatusInfoDTO(Status status)
        {
            Id = status.Id;
            Name = status.Name;
        }

    }
}
