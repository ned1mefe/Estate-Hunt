using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.API.Migrations
{
    /// <inheritdoc />
    public partial class fix_ValueAsTL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "ValueAsTl",
                table: "Currencies",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ValueAsTl",
                table: "Currencies",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
