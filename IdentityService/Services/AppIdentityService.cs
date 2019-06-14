using System.Collections.Generic;
using System.Threading.Tasks;
using IdentityService.DTOs;
using IdentityService.Entities;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace IdentityService.Services
{
    public class AppIdentityService: IAppIdentityService
    {
        private static readonly List<string> Roles = new List<string>
        {
            "PATIENT_UNAUTHORIZED",
            "PATIENT_UNAUTHORIZED",
            "DOCTOR",
            "MANAGEMENT"
        };

        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly string _jwtSecretKey;

        public AppIdentityService(
            AppDbContext context,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration configuration
        )
        {
            this._context = context;
            this._userManager = userManager;
            this._signInManager = signInManager;

            var jwtConfigurationSection = configuration.GetSection("JwtSecretKey");
            this._jwtSecretKey = jwtConfigurationSection.Get<string>();

            this.EnsureRolesCreated();
        }

        public async Task<UserAuthenticationResultDto> LoginAsync(UserDto user)
        {
            var result = await this._signInManager
                .PasswordSignInAsync(user.Email, user.Password, false, false);

            if (!result.Succeeded)
            {
                return null;
            }

            var dbUser = this._context.Users.First(u => u.Email == user.Email);
            var role = await this.GetUserRole(dbUser);
            if (role == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("UserRole", role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._jwtSecretKey));
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
            return new UserAuthenticationResultDto
            {
                Role = role,
                Token = handler.WriteToken(token)
            };
        }

        public async Task<string> RegisterAsync(UserDto user)
        {
            var newUser = new AppUser
            {
                UserName = user.Email,
                Email = user.Email
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);

            if (!result.Succeeded)
            {
                return null;
            }

            var createdUser = _context.Users.First(u => u.UserName == user.Email);
            var emailToken = _userManager.GenerateEmailConfirmationTokenAsync(createdUser);
            var emailResult = await _userManager.ConfirmEmailAsync(createdUser, emailToken.Result);

            if (!emailResult.Succeeded)
            {
                return null;
            }

            var roleResult = await _userManager.AddToRoleAsync(createdUser, user.Role);
            if (!roleResult.Succeeded)
            {
                return null;
            }

            return newUser.Id;
        }

        public async Task<bool> AuthorizeUserById(string id)
        {
            var user =_context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return false;
            }

            var removeResult = await this._userManager.RemoveFromRoleAsync(user, "PATIENT_UNAUTHORIZED");
            if (!removeResult.Succeeded)
            {
                return false;
            }

            var addingResult = await this._userManager.AddToRoleAsync(user, "PATIENT");
            
            return addingResult.Succeeded;
        }
        
        private void EnsureRolesCreated()
        {
            if (!this._context.Roles.Any())
            {
                var roles = Roles
                    .Select(roleName => new IdentityRole
                    {
                        Name = roleName,
                        NormalizedName = roleName
                    });

                this._context.AddRange(roles);
                this._context.SaveChanges();
            }
        }

        private async Task<string> GetUserRole(AppUser user)
        {
            foreach (var role in Roles)
            {
                var isInRole = await _userManager.IsInRoleAsync(user, role);
                if (isInRole)
                {
                    return role;
                }
            }

            return null;
        }
    }
}
