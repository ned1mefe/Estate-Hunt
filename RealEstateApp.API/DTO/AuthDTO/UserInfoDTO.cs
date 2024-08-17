using RealEstateApp.API.Auth;

namespace RealEstateApp.API.DTO.AuthDTO
{
    public class UserInfoDTO
    {
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }

        public UserInfoDTO(ApplicationUser user)
        {
            UserId = user.Id;
            FullName = user.FullName;
            Email = user.Email;
            PhoneNumber = user.PhoneNumber;
        }
    }
}
