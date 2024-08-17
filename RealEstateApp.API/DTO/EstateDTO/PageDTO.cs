namespace RealEstateApp.API.DTO.EstateDTO
{
    public class PageDTO
    {
        public List<EstateInfoDTO> estates {  get; set; }
        public int totalPages { get; set; }
    }
}
