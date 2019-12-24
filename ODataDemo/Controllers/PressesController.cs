using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ODataDemo.Models;
using ODataDemo.Utils;

namespace ODataDemo.Controllers
{
    /// <summary>
    /// PostgreSql 基础调用测试
    /// 可通过odata/api路由访问
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PressesController : BaseController
    {
        public PressesController(IOptions<AppSettings> settings, ODataDbContext context) : base(settings, context)
        {
        }

        //// GET: api/Values/GetCon
        [HttpGet("Con")]
        public string GetCon()
        {
            var con = _connections.PostgreSql;
            return con;
        }
        //// GET: api/Values/Setts
        [HttpGet("Setts")]
        public string GetSetts()
        {
            var str = JsonConvert.SerializeObject(_settings.Value);
            return str;
        }

        //// GET: api/Values
        [HttpGet]
        public string Get()
        {
            _context.Database.EnsureCreated();
            return JsonConvert.SerializeObject(_context.Presses.ToList());
        }

        //// GET: api/Values/5
        [HttpGet("{id:int}")]
        public string Get(int id)
        {
            return id.GetType().ToString();
        }
        //// GET: api/Values/abc
        [HttpGet("{id:alpha}")]
        public string Get(string id)
        {
            return id.GetType().ToString();
        }

        //// GET: api/Values/1/abc
        [HttpGet("{id:int}/{authid:alpha}")]
        public string Get(int id, string authid)
        {
            var str = id + authid;
            return str.ToString();
        }

        //// GET: api/Values/1/auth/abc
        [HttpGet("{id:int}/auth/{authid:int}")]
        public string Get(int id, int authid)
        {
            var str = id + authid;
            return str.ToString();
        }

        //// GET: api/Values/1/auth/abc
        [HttpPost]
        public string Post()
        {
            _context.Add(new Press() { Name = "邮电出版社", Email = "ydcbs@123.com" });
            _context.SaveChanges();
            return "OK";
        }

        //// GET: api/Values/1/auth/abc
        [HttpPost("Post2")]
        public string Post2()
        {
            _context.Add(new Press() { Name = "邮电出版社2", Email = "ydcbs@123.com" });
            _context.SaveChanges();
            return "OK";
        }

    }
}
