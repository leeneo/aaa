using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ODataDemo.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODataDemo.Models
{
    public class BaseDb : DbContext
    {
        protected readonly IOptions<AppSettings> _settings;
        protected readonly DefaultConnection _connections;

        //public BaseController()
        //{
        //}
        public BaseDb(IOptions<AppSettings> settings)
        {
            _settings = settings;
            _connections = settings.Value.DefaultConnection;
        }

    }
}
