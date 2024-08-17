namespace RealEstateApp.API.Entities
{
    public abstract class EstateParameter : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<Estate> Estates { get; set; }
    }
}
