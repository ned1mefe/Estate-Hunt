using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.ImageDTO
{
    public class ImageInfoDTO : BaseImageDTO
    {
        public int Id { get; set; }

        public ImageInfoDTO(Image image)
        {
            Id = image.Id;
            EstateId = image.EstateId;
            Base64 = image.Base64;
        }
    }
}
