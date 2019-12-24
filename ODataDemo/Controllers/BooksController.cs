using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ODataDemo.Models;
using ODataDemo.Utils;

namespace ODataDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ODataController
    {
        protected readonly IOptions<AppSettings> _settings;
        protected readonly DefaultConnection _connections;
        protected readonly ODataDbContext db;

        public BooksController(IOptions<AppSettings> settings, ODataDbContext context)
        {
            _settings = settings;
            _connections = settings.Value.DefaultConnection;
            db = context;
        }
        public List<Book> Books = new List<Book>
        {
            new Book
            {
                //Id = 1,
                ISBN = "111-0-321-56789-1",
                Title = "Calculus",
                Price = 66.6m,
                Address = new Address
                {
                    City = "Shanghai",
                    Street = "Beijin Xi Road"
                },
                Press = new Press
                {
                    //Id = 1,
                    Name = "Shanghai Tongji",
                    Category = Category.Book
}
            },
            new Book
            {
                //Id = 2,
                ISBN = "222-2-654-00000-2",
                Title = "Linear Algebra",
                Price = 53.2m,
                Address = new Address
                {
                    City = "Shanghai",
                    Street = "Beijin Dong Road"
                },
                Press = new Press
                {
                    //Id = 2,
                    Name = "Shanghai Fudan",
                    Category = Category.EBook
                }
            }
        };

        //[ODataAction(typeof(bool))]
        [HttpPost]
        public IActionResult Post()
        {
            db.Books.AddRange(Books);
            if (db.SaveChanges() > 0)
                return Ok(true);
            else
                return Ok(false);
        }
        [HttpPost("post2")]
        public IActionResult Post2()
        {
            db.Books.AddRange(Books);
            if (db.SaveChanges() > 0)
                return Ok(true);
            else
                return Ok(false);
        }

        [EnableQuery]
        public IActionResult Get()
        {
            var books = db.Books.ToList();
            return Ok(books);
        }

        //[EnableQuery]
        public IActionResult Get([FromODataUri]int key)
        {
            var book = db.Books.FirstOrDefault(b => b.Id == key);

            return Ok(book);
        }

        // GET: api/Books
        [HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Books/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
