using System;
namespace IdentityService.DTOs
{
    public class UserAuthenticationResultDto
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
