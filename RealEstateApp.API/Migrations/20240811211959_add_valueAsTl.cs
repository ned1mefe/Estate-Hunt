using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.API.Migrations
{
    /// <inheritdoc />
    public partial class add_valueAsTl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ValueAsTl",
                table: "Currencies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValueAsTl",
                table: "Currencies");
        }
    }
}
