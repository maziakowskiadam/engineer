using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using IdentityService.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
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
    public class PatientsController : Controller
    {
        private readonly AppDbContext context;
        private readonly IAppIdentityService identityService;

        public PatientsController(AppDbContext context, IAppIdentityService identityService)
        {
            this.context = context;
            this.identityService = identityService;
        }

        [HttpGet]
        public IActionResult All()
        {
            var patientRoles = new string[] { "PATIENT", "PATIENT_UNAUTHORIZED" };

            var result = this.context.Roles
                .Where(r => patientRoles.Contains(r.Name))
                .Join(
                    this.context.UserRoles,
                    role => role.Id,
                    userRole => userRole.RoleId,
                    (role, userRole) => new IdentityRoleDto
                    {
                        IdentityId = userRole.UserId,
                        RoleName = role.Name
                    })
                .ToList();


            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Authorize([FromForm] string identityId)
        {
            await this.identityService.AuthorizeUserById(identityId);
            return Ok();
        }

    }
}