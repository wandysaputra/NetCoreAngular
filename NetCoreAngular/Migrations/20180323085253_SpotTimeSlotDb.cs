using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NetCoreAngular.Migrations
{
    public partial class SpotTimeSlotDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "AdvertiserPosts");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "AdvertiserPosts");

            migrationBuilder.AddColumn<int>(
                name: "TimeSlotId",
                table: "AdvertiserPostSpots",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AdvertiserPostSpots_TimeSlotId",
                table: "AdvertiserPostSpots",
                column: "TimeSlotId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertiserPostSpots_TimeSlots_TimeSlotId",
                table: "AdvertiserPostSpots",
                column: "TimeSlotId",
                principalTable: "TimeSlots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertiserPostSpots_TimeSlots_TimeSlotId",
                table: "AdvertiserPostSpots");

            migrationBuilder.DropIndex(
                name: "IX_AdvertiserPostSpots_TimeSlotId",
                table: "AdvertiserPostSpots");

            migrationBuilder.DropColumn(
                name: "TimeSlotId",
                table: "AdvertiserPostSpots");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndTime",
                table: "AdvertiserPosts",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "AdvertiserPosts",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
