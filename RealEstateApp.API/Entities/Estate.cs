using RealEstateApp.API.Auth;

namespace RealEstateApp.API.Entities
{
    public class Estate : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public Status Status { get; set; }
        public int StatusId { get; set; }

        public EstateType Type { get; set; }
        public int TypeId { get; set; }

        public Currency Currency { get; set; }
        public int CurrencyId { get; set; }
        public int Price { get; set; }

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public ApplicationUser Owner { get; set; }
        public string OwnerId { get; set; }

        public List<Image>? Images {get; set;}

    }
}
