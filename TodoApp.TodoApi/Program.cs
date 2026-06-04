
using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Abstractions;
using TodoApp.Application.UseCases;
using TodoApp.Infrastructure.Persistence;
using TodoApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// API
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// DB SWITCH
var useInMemory = builder.Configuration.GetValue("UseInMemory", true);

if (useInMemory)
{
    builder.Services.AddDbContext<TodoContext>(o =>
        o.UseInMemoryDatabase("TodoDb"));
}
else
{
    builder.Services.AddDbContext<TodoContext>(o =>
        o.UseSqlServer(builder.Configuration.GetConnectionString("sql")));
}

// DI
// Add services to the container.
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<TodoService>();

// CORS (React)
builder.Services.AddCors(o =>
    o.AddDefaultPolicy(p =>
        p.AllowAnyOrigin()
         .AllowAnyHeader()
         .AllowAnyMethod()));

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();
app.UseHttpsRedirection();

app.Run();