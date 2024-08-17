using Microsoft.AspNetCore.Identity;
using RealEstateApp.API.Auth;

namespace RealEstateApp.API.Seed
{
    public class RoleSeed
    {
        public static async Task Seed(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                var roles = new[] { "User", "Administrator" };

                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new ApplicationRole(role));
                    }
                }
            }
        }
    }
}
