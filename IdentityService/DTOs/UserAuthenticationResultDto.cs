using System;
namespace IdentityService.DTOs
{
    public class UserAuthenticationResultDto
    {
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
