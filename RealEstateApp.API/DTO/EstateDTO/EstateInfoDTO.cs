using RealEstateApp.API.Entities;

namespace RealEstateApp.API.DTO.EstateDTO
{
    public class EstateInfoDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
        public string OwnerPhone { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; } // they are not ID
        public string EstateType { get; set; }
        public int Price { get; set; }
        public DateOnly StartDate {  get; set; }
        public DateOnly EndDate { get; set; }

        public EstateInfoDTO(Estate estate) 
        {
            this.Id = estate.Id;

            this.OwnerId = estate.OwnerId;
            this.OwnerName = estate.Owner.FullName;
            this.OwnerEmail = estate.Owner.Email;
            this.OwnerPhone = estate.Owner.PhoneNumber;

            this.Title = estate.Title;
            this.Description = estate.Description;

            this.Currency = estate.Currency.Name;
            this.Status = estate.Status.Name;
            this.EstateType = estate.Type.Name;
            this.Price = estate.Price;

            this.StartDate = estate.StartDate;
            this.EndDate = estate.EndDate;
        }
    }
}
