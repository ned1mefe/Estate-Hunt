namespace RealEstateApp.API.DTO.AuthDTO
{
    public class AuthDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class RegisterDTO : AuthDTO
    {
        public string? PhoneNumber { get; set; }
        public string FullName { get; set; }
    }

    public class LoginDTO : AuthDTO
    {

    }


}
