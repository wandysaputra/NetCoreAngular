using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace NetCoreAngular
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildHost(args).Run();

            // WebHost.CreateDefaultBuilder(args)
            //.ConfigureAppConfiguration(SetupConfiguration)
            //.UseStartup<Startup>()
            //.Build()
            //.Run();
        }

        public static IWebHost BuildHost(string[] args)
        {
            var host = WebHost.CreateDefaultBuilder(args)
           .ConfigureAppConfiguration(SetupConfiguration)
               .UseStartup<Startup>()
               .Build();

            return host;
        }

        private static void SetupConfiguration(WebHostBuilderContext ctx, IConfigurationBuilder builder)
        {
            //Removing the default configuration options
            builder.Sources.Clear();

            builder
                .SetBasePath(ctx.HostingEnvironment.ContentRootPath)
                .AddJsonFile("config.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
        }
    }
}
