using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.API.Migrations
{
    /// <inheritdoc />
    public partial class userestate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_OwnerId",
                table: "Estates",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Estates_AspNetUsers_OwnerId",
                table: "Estates",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Estates_AspNetUsers_OwnerId",
                table: "Estates");

            migrationBuilder.DropIndex(
                name: "IX_Estates_OwnerId",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Estates");
        }
    }
}
