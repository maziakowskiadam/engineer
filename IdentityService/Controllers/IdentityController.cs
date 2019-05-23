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


namespace IdentityService.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class IdentityController: Controller
    {
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public IdentityController (
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            AppDbContext context
        )
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._context = context;
        }

        [HttpPost]
        public async Task<string> Login([FromForm] UserDto user)
        {
            var result = await this._signInManager.PasswordSignInAsync(user.Email, user.Password, false, false);
            if (!result.Succeeded)
            {
                return "go away";
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("6NTT5eWFKokfm2v5c1496MPDPL9CqkXqEe84BJ4D5ZDCvYai6lcTBv78mTVRHtRq"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(1));

            var token = new JwtSecurityToken(
                "MCC",
                "MCC",
                claims,
                expires: expires,
                signingCredentials: creds
            );

            var handler = new JwtSecurityTokenHandler();
            return handler.WriteToken(token); ;
        }

        [HttpPost]
        public async Task<string> Register([FromForm] UserDto user)
        {
            var newUser = new AppUser
            {
                UserName = user.Email,
                Email = user.Email
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);

            if (!result.Succeeded)
            {
                return "0";
            }

            var createdUser = _context.Users.First(u => u.UserName == user.Email);
            var emailToken = _userManager.GenerateEmailConfirmationTokenAsync(createdUser);
            var emailResult = await _userManager.ConfirmEmailAsync(createdUser, emailToken.Result);

            if (!emailResult.Succeeded)
            {
                return "1";
            }

            return newUser.Id;
        }

    }

    public class UserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
