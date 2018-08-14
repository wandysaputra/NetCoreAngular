using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using NetCoreAngular.Data.Entities;
using System.IO;
using System.Linq;

namespace NetCoreAngular.Data
{
    public class NetCoreAngularContextFactory : IDesignTimeDbContextFactory<NetCoreAngularContext>
    {
        public NetCoreAngularContext CreateDbContext(string[] args)
        {
            // Create a configuration 
            var builder = new WebHostBuilder();
            var config = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("config.json")
              .Build();

            return new NetCoreAngularContext(new DbContextOptionsBuilder<NetCoreAngularContext>().Options, config);
        }
    }
}
