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


namespace IdentityService.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class PatientsController : Controller
    {
        private readonly AppDbContext context;

        public PatientsController(AppDbContext context)
        {
            this.context = context;
        }

        public void GetAll()
        {
            // this.context.P
        }


    }
}