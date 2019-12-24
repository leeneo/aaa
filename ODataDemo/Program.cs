using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ODataDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseKestrel(options =>
                {
                    //var root = Path.GetDirectoryName(typeof(Program).Assembly.Location);
                    // var root="D:\\lish\\myprojs\\ODataDemo";
                    var root=Directory.GetCurrentDirectory();
                    Console.WriteLine("++++++++++++++++++++++ " + root+" ++++++++++++++++++++++");
                    options.Listen(IPAddress.Loopback, 5001, listenOptions => listenOptions.UseHttps($"{root}\\localhost.pfx", "leeneo"));
                });
    }
}
