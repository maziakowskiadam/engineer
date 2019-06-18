using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using IdentityService.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using System.Linq;
using IdentityService.DTOs;
using IdentityService.Services;


namespace IdentityService.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class IdentityController : Controller
    {
        private readonly IAppIdentityService _identityService;

        public IdentityController(
            IAppIdentityService identityService
        )
        {
            this._identityService = identityService;
        }


        [HttpPost]
        public async Task<IActionResult> Login(UserDto user)
        {
            var loginResult = await this._identityService.LoginAsync(user);

            if (loginResult == null)
            {
                return Unauthorized();
            }

            return Ok(loginResult);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterPatient([FromForm] UserDto user)
        {
            user.Role = "PATIENT";

            var registerResult = await this._identityService.RegisterAsync(user);
            return Ok(registerResult);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterPatientUnauthorized([FromForm] UserDto user)
        {
            user.Role = "PATIENT_UNAUTHORIZED";

            var registerResult = await this._identityService.RegisterAsync(user);
            return Ok(registerResult);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterDoctor([FromForm] UserDto user)
        {
            user.Role = "DOCTOR";

            var registerResult = await this._identityService.RegisterAsync(user);
            return Ok(registerResult);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterManagement([FromForm] UserDto user)
        {
            user.Role = "MANAGEMENT";

            var registerResult = await this._identityService.RegisterAsync(user);
            return Ok(registerResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddSuperAdmin()
        {
            var user = new UserDto
            {
                Email = "admin@example.com",
                Password = "superAdmin123",
                Role = "MANAGEMENT"
            };
            
            var registerResult = await this._identityService.RegisterAsync(user);
            return Ok(registerResult);
        }

    }
}
