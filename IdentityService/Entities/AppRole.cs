using System;
using Microsoft.AspNetCore.Identity;
namespace IdentityService.Entities
{
    public class AppRole: IdentityRole
    {
        public string Name { get; set; }
    }
}
