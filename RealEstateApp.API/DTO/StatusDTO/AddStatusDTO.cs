using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.StatusDTO
{
    public class AddStatusDTO: EstateParameterBaseDTO
    {
        public Status ToStatus()
        {
            return new Status
            {
                Name = this.Name
            };
        }
    }
}
