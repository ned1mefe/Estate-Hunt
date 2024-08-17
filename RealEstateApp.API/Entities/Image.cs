namespace RealEstateApp.API.Entities
{
    public class Image : BaseEntity
    {
        public string Base64 { get; set; }
        public Estate Estate { get; set; }
        public int EstateId { get; set; }
    }
}
