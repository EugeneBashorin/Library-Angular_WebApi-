using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;


[assembly: OwinStartup(typeof(Library_Angular_WebApi_.App_Start.Startup))]
namespace Library_Angular_WebApi_.App_Start
{

    public class Startup
    {
        ServiceCreator serviceCreator = new ServiceCreator();

        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<IUserService>(CreateUserService);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                //LoginPath = new PathString("/UserIdentityApi/Index"),
                //LoginPath = new PathString("/Account/Login"),
            });
        }
        private IUserService CreateUserService()
        {
            
            return serviceCreator.CreateUserService("IdentityDataBase");
        }
    }
}