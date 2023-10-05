using Altinn.Authentication.UI.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
//https://github.com/Altinn/altinn-authentication-frontend/issues/22

namespace Altinn.Authentication.UI.Controllers
{
    /// <summary>
    /// This API performs basic CRUD operations for the System Users
    /// </summary>
    [Route("authfront/api/v1/systemuser")]
    [ApiController]
    //[AutoValidateAntiforgeryTokenIfAuthCookie]
    public class SystemUserController : ControllerBase
    {
        

        private List<SystemUser> MockTestHelper() 
        {
            //Mock Data
            SystemUser systemUser1 = new SystemUser()
            {
                Id = "1",
                Title = "Vårt regnskapsystem",
                Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
                SystemType = "534-ADF-SF",
                Created = "2023-09-12",
                ClientId = "20578230597"
            };

            SystemUser systemUser2 = new SystemUser()
            {
                Id = "2",
                Title = "Vårt andre regnskapsystem",
                Description = "Koblet opp mot Visma. Snakk med Pål om abonnement",
                SystemType = "534-ADF-SF",
                Created = "2023-09-22",
                ClientId = "20578230598"
            };

            SystemUser systemUser3 = new SystemUser()
            {
                Id = "3",
                Title = "Et helt annet system",
                Description = "Fiken superskatt",
                SystemType = "lfhiwlfhi",
                Created = "2023-09-22",
                ClientId = "23523523"
            };

            List<SystemUser> systemUserList = new List<SystemUser>();

            systemUserList.Add(systemUser1);
            systemUserList.Add(systemUser2);
            systemUserList.Add(systemUser3);

            return systemUserList;
        }

        // GET: api/<SystemUserController>
        //[Authorize] //TODO: må fikse
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemUser>>> GetSystemUserList()
        {

            var list = MockTestHelper();

            return Ok(list);
        }

        // GET api/<SystemUserController>/5
        //[Authorize]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetSystemUser(string id)
        {
            var usr = MockTestHelper().Find(u => u.Id == id);

            return Ok(usr);
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
        public string? ClientId { get; set; }
    }
}
