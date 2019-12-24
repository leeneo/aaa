using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ODataDemo.Models;
using ODataDemo.Utils;

namespace ODataDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController
    {
        protected readonly IOptions<AppSettings> _settings;
        protected readonly DefaultConnection _connections;
        protected readonly ODataDbContext _context;

        //public BaseController()
        //{
        //}
        public BaseController(IOptions<AppSettings> settings)
        {
            _settings = settings;
            _connections = settings.Value.DefaultConnection;
        }
        public BaseController(IOptions<AppSettings> settings,  ODataDbContext context)
        {
            _settings = settings;
            _connections = settings.Value.DefaultConnection;
            _context = context;
        }

    }
}
