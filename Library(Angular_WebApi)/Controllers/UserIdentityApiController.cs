using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Interfaces;
using Library_Angular_WebApi_.Models;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Library_Angular_WebApi_.Controllers
{
    public class UserIdentityApiController : ApiController
    {      

        private IUserService UserService
        {
            get
            {
                var context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
                return context.GetOwinContext().GetUserManager<IUserService>();//HttpContext.GetOwinContext().GetUserManager<IUserService>();
            }
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                var context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
                return context.GetOwinContext().Authentication;
                //return HttpContext.GetOwinContext().Authentication;
            }
        }

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        [HttpGet]
        public HttpResponseMessage Index()
        {
            List<UserDTO> usersList = UserService.GetUsers();
            List<ManageUsersModel> users = new List<ManageUsersModel>();
            foreach (var a in usersList)
            {
                users.Add(new ManageUsersModel { Id = a.Id, Email = a.Email, Name = a.Name, IsBanned = a.IsBanned });
            }
            return ToJson(users);
        }

        //[AllowAnonymous]
        //public ActionResult Login()
        //{
        //    return View();
        //}

        ////[ValidateAntiForgeryToken]
        //[HttpPost]
        //[AllowAnonymous]       
        //public async Task<ActionResult> Login(LoginModel model)
        //{
        //    await SetInitialDataAsync();
        //    if (ModelState.IsValid)
        //    {
        //        UserDTO userDto = new UserDTO { Email = model.Email, Password = model.Password };
        //        ClaimsIdentity claim = await UserService.Authenticate(userDto);

        //        if (claim == null)
        //        {
        //            ModelState.AddModelError("", "Wrong Login or Password or your profile was banned.");
        //        }
        //        else
        //        {
        //            AuthenticationManager.SignOut();
        //            AuthenticationManager.SignIn(new AuthenticationProperties
        //            {
        //                IsPersistent = true
        //            }, claim);
        //            return RedirectToAction("Books", "Home");
        //        }
        //    }
        //    return View(model);
        //}

        //public ActionResult Logout()
        //{
        //    AuthenticationManager.SignOut();
        //    return RedirectToAction("Books", "Home");
        //}

        //[AllowAnonymous]
        //public ActionResult Register()
        //{
        //    return View();
        //}

        ////[ValidateAntiForgeryToken]
        //[HttpPost]
        //[AllowAnonymous]
        //public async Task<ActionResult> Register(RegisterModel model)
        //{
        //    await SetInitialDataAsync();

        //    if (ModelState.IsValid)
        //    {
        //        UserDTO userDto = new UserDTO
        //        {
        //            Email = model.Email,
        //            Password = model.Password,
        //            Name = model.Name,
        //            Role = "user",
        //            IsBanned = "false"
        //        };
        //        OperationDetails operationDetails = await UserService.Create(userDto);
        //        if (operationDetails.Succedeed)
        //            return RedirectToAction("Books", "Home");
        //        else
        //            ModelState.AddModelError(operationDetails.Property, operationDetails.Message);
        //    }
        //    return View(model);
        //}

        //private async Task SetInitialDataAsync()
        //{
        //    await UserService.SetInitialData(new UserDTO { Email = IdentityConfiguration._ADMIN_EMAIL, UserName = IdentityConfiguration._ADMIN_EMAIL, Password = IdentityConfiguration._ADMIN_PASSWORD, Name = IdentityConfiguration._ADMIN_NAME, Role = IdentityConfiguration._ADMIN_ROLE, IsBanned = "false" },
        //                                     new List<string> { IdentityConfiguration._USER_ROLE, IdentityConfiguration._ADMIN_ROLE });
        //}

        //public ActionResult SetBannUser(string id, string banned)
        //{
        //    UserService.UpdateBannState(id, banned);
        //    return RedirectToAction("Index");
        //}

    }
}
