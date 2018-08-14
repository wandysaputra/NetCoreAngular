using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using Newtonsoft.Json;

namespace NetCoreAngular
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private readonly IHostingEnvironment _environment;

        public Startup(IConfiguration config, IHostingEnvironment env)
        {
            _config = config;
            _environment = env;
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<NetCoreAngularContext>(ServiceLifetime.Scoped);
            //(cfg =>
            //{
            //    cfg.UseSqlServer(_config.GetConnectionString("BizConnectionString"));
            //});

            services.AddIdentity<AppUser, IdentityRole>(cfg =>
            {
                cfg.User.RequireUniqueEmail = true;                
            })
            .AddEntityFrameworkStores<NetCoreAngularContext>(); //Can use seperate db

            services.AddAuthentication()
                .AddJwtBearer(cfg=>
                {
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = _config["Tokens:Issuer"],
                        ValidAudience = _config["Tokens:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]))
                    };
                });

            AutoMapper.ServiceCollectionExtensions.UseStaticRegistration = false;
            if (services.All(a => a.ImplementationType != typeof(IMapper)))
            {
                services.AddAutoMapper();
            }

            services.AddTransient<NetCoreAngularSeeder>();

            services.AddScoped<INetCoreAngularRepository, NetCoreAngularRepository>();

            services.AddMvc(opt =>
            {
                if (_environment.IsProduction())
                {
                    opt.Filters.Add(new RequireHttpsAttribute());
                }
            })
            .AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (_environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }

            //app.UseStaticFiles();

            //app.UseAuthentication();

            //app.UseMvc(cfg =>
            //{
            //    cfg.MapRoute("Default",
            //      "{controller}/{action}/{id?}",
            //      new { controller = "App", Action = "Index" });
            //});
            app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                   !Path.HasExtension(context.Request.Path.Value) &&
                   !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });
            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (_environment.IsDevelopment())
            {
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    var seeder = scope.ServiceProvider.GetService<NetCoreAngularSeeder>();
                    seeder.SeedAsync().Wait();
                }
            }
        }
    }
}
