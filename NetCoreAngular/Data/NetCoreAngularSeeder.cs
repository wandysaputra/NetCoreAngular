using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using NetCoreAngular.Data.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data
{
    public class NetCoreAngularSeeder
    {
        private readonly NetCoreAngularContext _context;
        private readonly IHostingEnvironment _hosting;
        private readonly UserManager<AppUser> _userManager;

        public NetCoreAngularSeeder(NetCoreAngularContext context, IHostingEnvironment hosting
            , UserManager<AppUser> userManager)
        {
            _context = context;
            _hosting = hosting;
            _userManager = userManager;
        }
        //dotnet ef migrations add InitialDb
        //dotnet ef database update
        public async Task SeedAsync()
        {
            //_context.Database.EnsureCreated();

            var user = await _userManager.FindByEmailAsync("wandy.saputra@hotmail.com");
            if (user == null)
            {
                user = new AppUser()
                {
                    FirstName = "Wandy",
                    LastName = "Saputra",
                    UserName = "wandy.saputra@hotmail.com",
                    Email = "wandy.saputra@hotmail.com"
                };

                var result = await _userManager.CreateAsync(user, "P@ssw0rd!");
                if (result != IdentityResult.Success)
                {
                    throw new Exception("Failed to create default user");
                }
            }

            if (!_context.Provinces.Any())
            {
                // Need to create sample data
                var filepath = Path.Combine(_hosting.ContentRootPath, "Data/province.json");
                var json = File.ReadAllText(filepath);
                var province = JsonConvert.DeserializeObject<IEnumerable<Province>>(json);
                _context.Provinces.AddRange(province);
            }

            if (!_context.Regencies.Any())
            {
                var filepath = Path.Combine(_hosting.ContentRootPath, "Data/regency.json");
                var json = File.ReadAllText(filepath);
                var regencies = JsonConvert.DeserializeObject<IEnumerable<Regency>>(json);
                regencies.ToList().ForEach(f =>
                {
                    f.ProvinceId = _context.Provinces.FirstOrDefault(p => p.Code == f.ProvinceId.ToString()).Id;
                });

                _context.Regencies.AddRange(regencies);
            }

            if (!_context.Districts.Any())
            {
                var filepath = Path.Combine(_hosting.ContentRootPath, "Data/district.json");
                var json = File.ReadAllText(filepath);
                var districts = JsonConvert.DeserializeObject<IEnumerable<District>>(json);
                districts.ToList().ForEach(f =>
                {
                    f.RegencyId = _context.Regencies.FirstOrDefault(p => p.Code == f.RegencyId.ToString()).Id;
                });

                _context.Districts.AddRange(districts);
            }

            if (!_context.Villages.Any())
            {
                var filepath = Path.Combine(_hosting.ContentRootPath, "Data/village.json");
                var json = File.ReadAllText(filepath);
                var villages = JsonConvert.DeserializeObject<IEnumerable<Village>>(json);
                villages.ToList().ForEach(f =>
                {
                    f.DistrictId = _context.Districts.FirstOrDefault(p => p.Code == f.DistrictId.ToString()).Id;
                });

                _context.Villages.AddRange(villages);
            }

            _context.SaveChanges();

        }
    }
}
