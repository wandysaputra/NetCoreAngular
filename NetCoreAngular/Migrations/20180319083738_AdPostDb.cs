using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NetCoreAngular.Migrations
{
    public partial class AdPostDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "AdSpots",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AdvertiserPosts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdvertiserId = table.Column<int>(nullable: false),
                    Code = table.Column<string>(maxLength: 100, nullable: false),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    CreatedBy = table.Column<string>(nullable: true),
                    Edited = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    EditedBy = table.Column<string>(nullable: true),
                    EndTime = table.Column<TimeSpan>(nullable: false),
                    Html = table.Column<string>(maxLength: 2000, nullable: true),
                    ImageUrl = table.Column<string>(maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    PostTypeId = table.Column<int>(nullable: false),
                    StartTime = table.Column<TimeSpan>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertiserPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdvertiserPosts_Advertisers_AdvertiserId",
                        column: x => x.AdvertiserId,
                        principalTable: "Advertisers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdvertiserPostLogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdSpotId = table.Column<int>(nullable: false),
                    AdvertiserPostId = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    CreatedBy = table.Column<string>(nullable: true),
                    Edited = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    EditedBy = table.Column<string>(nullable: true),
                    ExecutedDateTime = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    IsLoadCompleted = table.Column<bool>(nullable: false, defaultValue: false),
                    LoadCompletedDateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertiserPostLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdvertiserPostLogs_AdSpots_AdSpotId",
                        column: x => x.AdSpotId,
                        principalTable: "AdSpots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvertiserPostLogs_AdvertiserPosts_AdvertiserPostId",
                        column: x => x.AdvertiserPostId,
                        principalTable: "AdvertiserPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdvertiserPostSpots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdSpotId = table.Column<int>(nullable: false),
                    AdvertiserPostId = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    CreatedBy = table.Column<string>(nullable: true),
                    Edited = table.Column<DateTime>(nullable: false, defaultValueSql: "getutcdate()"),
                    EditedBy = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdvertiserPostSpots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdvertiserPostSpots_AdSpots_AdSpotId",
                        column: x => x.AdSpotId,
                        principalTable: "AdSpots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdvertiserPostSpots_AdvertiserPosts_AdvertiserPostId",
                        column: x => x.AdvertiserPostId,
                        principalTable: "AdvertiserPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPostLogs_AdSpotId",
                table: "AdvertiserPostLogs",
                column: "AdSpotId");

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPostLogs_AdvertiserPostId",
                table: "AdvertiserPostLogs",
                column: "AdvertiserPostId");

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPosts_AdvertiserId",
                table: "AdvertiserPosts",
                column: "AdvertiserId");

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPosts_Code",
                table: "AdvertiserPosts",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPostSpots_AdSpotId",
                table: "AdvertiserPostSpots",
                column: "AdSpotId");

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPostSpots_AdvertiserPostId",
                table: "AdvertiserPostSpots",
                column: "AdvertiserPostId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdvertiserPostLogs");

            migrationBuilder.DropTable(
                name: "AdvertiserPostSpots");

            migrationBuilder.DropTable(
                name: "AdvertiserPosts");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "AdSpots",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200);
        }
    }
}
