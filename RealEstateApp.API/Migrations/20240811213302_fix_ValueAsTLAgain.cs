using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.API.Migrations
{
    /// <inheritdoc />
    public partial class fix_ValueAsTLAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "ValueAsTl",
                table: "Currencies",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "ValueAsTl",
                table: "Currencies",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
