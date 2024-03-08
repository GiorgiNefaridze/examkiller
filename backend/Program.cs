using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string? connectionString = builder.Configuration.GetConnectionString("DdConnection");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
builder.Services.AddDbContext<ExamKillerDbContext>(opt => opt.UseNpgsql(connectionString));
builder.Services.AddCors(c => c.AddDefaultPolicy(
    b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
));

builder.Services.AddScoped<IPasswordHashingService,PasswordHashingService>();

var app = builder.Build();

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();   

app.Run();