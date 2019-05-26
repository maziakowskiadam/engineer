using System;
using System.Threading.Tasks;
using IdentityService.DTOs;
namespace IdentityService.Services
{
    public interface IAppIdentityService
    {
        Task<string> LoginAsync(UserDto userDto);
        Task<string> RegisterAsync(UserDto userDto);
    }
}
