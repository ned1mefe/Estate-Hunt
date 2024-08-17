using Microsoft.AspNetCore.Identity;
using RealEstateApp.API.Entities;

namespace RealEstateApp.API.Auth
{
    public class ApplicationUser: IdentityUser
    {
        public string FullName { get; set; }
        public ICollection<Estate> Estates { get; set; }
    }
}
