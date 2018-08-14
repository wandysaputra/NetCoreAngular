using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetCoreAngular.Data.Entities;
using System.Linq;

namespace NetCoreAngular.Data
{
    public class NetCoreAngularContext : IdentityDbContext<AppUser>
    {
        private readonly IConfiguration _config;

        public NetCoreAngularContext(DbContextOptions<NetCoreAngularContext> options, IConfiguration config) : base(options)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("BizConnectionString"));
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes().Where(t => t.ClrType.IsSubclassOf(typeof(BaseEntity))))
            {
                builder.Entity(
                    entityType.Name,
                    x =>
                    {
                        x.Property("Created")
                            .HasDefaultValueSql("getutcdate()");
                                                
                        x.Property("Edited")
                            .HasDefaultValueSql("getutcdate()");                        

                        x.Property("IsActive")
                            .HasDefaultValue(true);
                    });
            }

            builder.Entity<Province>().HasIndex(u => u.Code).IsUnique();
            builder.Entity<Regency>().HasIndex(u => u.Code).IsUnique();
            builder.Entity<District>().HasIndex(u => u.Code).IsUnique();
            builder.Entity<Village>().HasIndex(u => u.Code).IsUnique();

            builder.Entity<AdvertiserPost>().HasIndex(u => u.Code).IsUnique();
            builder.Entity<AdvertiserPostLog>().Property("IsLoadCompleted").HasDefaultValue(false);

            base.OnModelCreating(builder);
        }
        
        public DbSet<Group> Groups { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<GroupMenu> GroupMenus { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }

        public DbSet<Province> Provinces { get; set; }
        public DbSet<Regency> Regencies { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Village> Villages { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }

        public DbSet<AdSpot> AdSpots { get; set; }
        public DbSet<Advertiser> Advertisers { get; set; }
        public DbSet<AdvertiserPost> AdvertiserPosts { get; set; }
        public DbSet<AdvertiserPostSpot> AdvertiserPostSpots { get; set; }
        public DbSet<AdvertiserPostLog> AdvertiserPostLogs { get; set; }
    }
}
