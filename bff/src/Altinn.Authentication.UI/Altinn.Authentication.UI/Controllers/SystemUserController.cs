using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
//https://github.com/Altinn/altinn-authentication-frontend/issues/22

namespace Altinn.Authentication.UI.Controllers
{
    [Route("authfront/api/v1/systemuser")]
    [ApiController]
    [AutoValidateAntiforgeryTokenIfAuthCookie]
    public class SystemUserController : ControllerBase
    {
        //Mock Data
        SystemUser systemUser1 = new SystemUser()
        {
            Id = "2334-34545-2-324-2-2",
            Title = "Vårt regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "534-ADF-SF",
            Created = "2023-09-12"
        };

        SystemUser systemUser2 = new SystemUser()
        {
            Id = "2334-34545-2-324-2-3",
            Title = "Vårt andre regnskapsystem",
            Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
            SystemType = "534-ADF-SF",
            Created = "2023-09-22"
        };

        // GET: api/<SystemUserController>
        //[Authorize] //TODO: må fikse
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemUser>>> GetSystemUserList()
        {
            List<SystemUser> systemUserList = new List<SystemUser>();

            systemUserList.Add(systemUser1);
            systemUserList.Add(systemUser2);


            return Ok(systemUserList);
        }

        // GET api/<SystemUserController>/5
        //[Authorize]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetSystemUser(int id)
        {
            

            return Ok(systemUser1);
        }

        // POST api/<SystemUserController>
        //[Authorize]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SystemUserController>/5
        //[Authorize]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SystemUserController>/5
        //[Authorize]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class SystemUser
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? SystemType { get; set; }
        public string? Created { get; set; }
    }
}
