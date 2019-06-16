using System;
using System.Threading.Tasks;
using IdentityService.DTOs;
namespace IdentityService.Services
{
    public interface IAppIdentityService
    {
        Task<UserAuthenticationResultDto> LoginAsync(UserDto userDto);
        Task<string> RegisterAsync(UserDto userDto);
        Task<bool> AuthorizeUserById(string id);
    }
}
