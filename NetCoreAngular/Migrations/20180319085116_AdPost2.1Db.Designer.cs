﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using NetCoreAngular.Data;
using System;

namespace NetCoreAngular.Migrations
{
    [DbContext(typeof(NetCoreAngularContext))]
    [Migration("20180319085116_AdPost2.1Db")]
    partial class AdPost21Db
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdSpot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<int>("DistrictId");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("Postcode")
                        .HasMaxLength(10);

                    b.Property<int>("ProvinceId");

                    b.Property<int>("RegencyId");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasMaxLength(1000);

                    b.Property<int>("VillageId");

                    b.HasKey("Id");

                    b.ToTable("AdSpots");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Advertiser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<int>("DistrictId");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .HasMaxLength(200);

                    b.Property<string>("Postcode")
                        .HasMaxLength(10);

                    b.Property<int>("ProvinceId");

                    b.Property<int>("RegencyId");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasMaxLength(1000);

                    b.Property<int>("VillageId");

                    b.HasKey("Id");

                    b.ToTable("Advertisers");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdvertiserPost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ActiveFrom");

                    b.Property<DateTime>("ActiveTo");

                    b.Property<int>("AdvertiserId");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<TimeSpan>("EndTime");

                    b.Property<string>("Html")
                        .HasMaxLength(2000);

                    b.Property<string>("ImageUrl")
                        .HasMaxLength(2000);

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<int>("PostTypeId");

                    b.Property<TimeSpan>("StartTime");

                    b.HasKey("Id");

                    b.HasIndex("AdvertiserId");

                    b.HasIndex("Code")
                        .IsUnique();

                    b.ToTable("AdvertiserPosts");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdvertiserPostLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdSpotId");

                    b.Property<int>("AdvertiserPostId");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<DateTime>("ExecutedDateTime");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<bool>("IsLoadCompleted")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<DateTime>("LoadCompletedDateTime");

                    b.HasKey("Id");

                    b.HasIndex("AdSpotId");

                    b.HasIndex("AdvertiserPostId");

                    b.ToTable("AdvertiserPostLogs");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdvertiserPostSpot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdSpotId");

                    b.Property<int>("AdvertiserPostId");

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.HasKey("Id");

                    b.HasIndex("AdSpotId");

                    b.HasIndex("AdvertiserPostId");

                    b.ToTable("AdvertiserPostSpots");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.District", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .HasMaxLength(20);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<int>("RegencyId");

                    b.HasKey("Id");

                    b.HasIndex("Code")
                        .IsUnique()
                        .HasFilter("[Code] IS NOT NULL");

                    b.HasIndex("RegencyId");

                    b.ToTable("Districts");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<string>("Description")
                        .HasMaxLength(1000);

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.GroupMenu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<int?>("GroupId");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<int?>("MenuId");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("MenuId");

                    b.ToTable("GroupMenus");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<string>("Icon")
                        .HasMaxLength(50);

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<int?>("ParentMenuId");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Url")
                        .HasMaxLength(500);

                    b.HasKey("Id");

                    b.HasIndex("ParentMenuId");

                    b.ToTable("Menus");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .HasMaxLength(20);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Code")
                        .IsUnique()
                        .HasFilter("[Code] IS NOT NULL");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Regency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .HasMaxLength(20);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<int>("ProvinceId");

                    b.HasKey("Id");

                    b.HasIndex("Code")
                        .IsUnique()
                        .HasFilter("[Code] IS NOT NULL");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Regencies");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.UserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<int?>("GroupId");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Village", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .HasMaxLength(20);

                    b.Property<DateTime>("Created")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("CreatedBy");

                    b.Property<int>("DistrictId");

                    b.Property<DateTime>("Edited")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<string>("EditedBy");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Code")
                        .IsUnique()
                        .HasFilter("[Code] IS NOT NULL");

                    b.HasIndex("DistrictId");

                    b.ToTable("Villages");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("NetCoreAngular.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdvertiserPost", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.Advertiser", "Advertiser")
                        .WithMany()
                        .HasForeignKey("AdvertiserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdvertiserPostLog", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.AdSpot", "AdSpot")
                        .WithMany()
                        .HasForeignKey("AdSpotId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("NetCoreAngular.Data.Entities.AdvertiserPost", "AdvertiserPost")
                        .WithMany()
                        .HasForeignKey("AdvertiserPostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.AdvertiserPostSpot", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.AdSpot", "AdSpot")
                        .WithMany()
                        .HasForeignKey("AdSpotId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("NetCoreAngular.Data.Entities.AdvertiserPost", "AdvertiserPost")
                        .WithMany()
                        .HasForeignKey("AdvertiserPostId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.District", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.Regency", "Regency")
                        .WithMany()
                        .HasForeignKey("RegencyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.GroupMenu", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("NetCoreAngular.Data.Entities.Menu", "Menu")
                        .WithMany()
                        .HasForeignKey("MenuId");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Menu", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.Menu", "ParentMenu")
                        .WithMany()
                        .HasForeignKey("ParentMenuId");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Regency", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.Province", "Province")
                        .WithMany()
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.UserGroup", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("NetCoreAngular.Data.Entities.AppUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("NetCoreAngular.Data.Entities.Village", b =>
                {
                    b.HasOne("NetCoreAngular.Data.Entities.District", "District")
                        .WithMany()
                        .HasForeignKey("DistrictId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
