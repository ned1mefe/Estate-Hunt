using Microsoft.AspNetCore.Identity;
using RealEstateApp.API.Auth;

namespace RealEstateApp.API.Seed
{
    public class AdminSeed
    {
        public static async Task Seed(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

                string adminRole = "Administrator";
                string adminEmail = "admin@admin.com";
                
                if (await userManager.FindByEmailAsync(adminEmail) == null)
                {
                    var user = new ApplicationUser
                    {
                        UserName = adminEmail,
                        Email = adminEmail,
                        FullName = "Administrator"
                    };

                    var result = await userManager.CreateAsync(user, "Admin123,");

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, adminRole);
                    }
                }
            }
        }
    }
}
