using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NetCoreAngular.Migrations
{
    public partial class AdSpotDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdSpots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    CreatedBy = table.Column<string>(nullable: true),
                    DistrictId = table.Column<int>(nullable: false),
                    Edited = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    EditedBy = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Postcode = table.Column<string>(maxLength: 10, nullable: true),
                    ProvinceId = table.Column<int>(nullable: false),
                    RegencyId = table.Column<int>(nullable: false),
                    Street = table.Column<string>(maxLength: 1000, nullable: false),
                    VillageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdSpots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Advertisers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    CreatedBy = table.Column<string>(nullable: true),
                    DistrictId = table.Column<int>(nullable: false),
                    Edited = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    EditedBy = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    Postcode = table.Column<string>(maxLength: 10, nullable: true),
                    ProvinceId = table.Column<int>(nullable: false),
                    RegencyId = table.Column<int>(nullable: false),
                    Street = table.Column<string>(maxLength: 1000, nullable: false),
                    VillageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advertisers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Villages_Code",
                table: "Villages",
                column: "Code",
                unique: true,
                filter: "[Code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Regencies_Code",
                table: "Regencies",
                column: "Code",
                unique: true,
                filter: "[Code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_Code",
                table: "Provinces",
                column: "Code",
                unique: true,
                filter: "[Code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Districts_Code",
                table: "Districts",
                column: "Code",
                unique: true,
                filter: "[Code] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdSpots");

            migrationBuilder.DropTable(
                name: "Advertisers");

            migrationBuilder.DropIndex(
                name: "IX_Villages_Code",
                table: "Villages");

            migrationBuilder.DropIndex(
                name: "IX_Regencies_Code",
                table: "Regencies");

            migrationBuilder.DropIndex(
                name: "IX_Provinces_Code",
                table: "Provinces");

            migrationBuilder.DropIndex(
                name: "IX_Districts_Code",
                table: "Districts");
        }
    }
}
