using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using Entities.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace Library_Angular_WebApi_.Controllers
{
    public class BookAPIController  : ApiController   
    {
        IHomeService homeService;

        //FIX NINJECT TO DEL empty constructor
        public BookAPIController()
        {
            IBookRepository BookRepository = new BookRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            IMagazineRepository MagazineRepository = new MagazineRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            INewspaperRepository NewspaperRepository = new NewspaperRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            IBukletRepository BukletRepository = new BukletRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
            homeService = new HomeService(BookRepository, MagazineRepository, NewspaperRepository, BukletRepository);
        }

      //  public BookAPIController(IHomeService _homeService)
       // {
        //    homeService = _homeService;
      //  }

         protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        public HttpResponseMessage Get()
        {
            return ToJson(homeService.GetBooks());
        }

        public HttpResponseMessage Post([FromBody]Book value)
        {
            homeService.AddBook(value);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(/*******ASK?*******/1), Encoding.UTF8, "application/json");
            return response;          
        }

        public HttpResponseMessage Put(int id, [FromBody]Book value)
        {
           homeService.UpdateBook(id, value);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(/*******ASK?*******/1), Encoding.UTF8, "application/json");
            return response;          
        }

        //SHOW Button
        public HttpResponseMessage Get(int id)
        {
            return ToJson(homeService.GetBook(id));
        }

        public HttpResponseMessage Delete(int id)
        {
            homeService.DeleteBook(id);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(/*******ASK?*******/1), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
/*
<system.web.webPages.razor>
<host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
<pages pageBaseType="System.Web.Mvc.WebViewPage">
<namespaces>
<add namespace="System.Web.Mvc" />
<add namespace="System.Web.Mvc.Ajax" />
<add namespace="System.Web.Mvc.Html" />
<add namespace="System.Web.Optimization"/>
<add namespace="System.Web.Routing" />
</namespaces>
</pages>
</system.web.webPages.razor>
*/
