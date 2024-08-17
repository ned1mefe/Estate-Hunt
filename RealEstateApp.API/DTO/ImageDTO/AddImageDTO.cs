using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.ImageDTO
{
    public class AddImageDTO : BaseImageDTO
    {
        public Image ToImage()
        {
            return new Image
            {
                EstateId = EstateId,
                Base64 = Base64
            };
        }
    }
}
