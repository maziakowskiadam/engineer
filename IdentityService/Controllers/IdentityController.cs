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
    public class IdentityController: Controller
    {
        private readonly IAppIdentityService _identityService;

        public IdentityController(
            IAppIdentityService identityService
        )
        {
            this._identityService = identityService;
        }


        [HttpPost]
        public async Task<IActionResult> Login([FromForm] UserDto user)
        {
            var loginResult = await this._identityService.LoginAsync(user);

            if (loginResult == null)
            {
                return Unauthorized();
            }

            return Ok(loginResult);
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm] UserDto user)
        {
            var registerResult = await this._identityService.RegisterAsync(user);

            return Ok(registerResult);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterPatient([FromForm] UserDto user)
        {
            user.Role = "PATIENT";

            var registerResult = await this._identityService.RegisterAsync(user);
            return Ok(registerResult);
        }



    }
}
