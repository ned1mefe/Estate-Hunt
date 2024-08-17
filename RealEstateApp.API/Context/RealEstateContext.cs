using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.API.Auth;
using RealEstateApp.API.Entities;

namespace RealEstateApp.API.Context
{
    public class RealEstateContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public RealEstateContext(DbContextOptions<RealEstateContext> options):base(options) { }
    
        public DbSet<Estate> Estates { get; set; }
        public DbSet<EstateType> EstateTypes { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
