var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql")
                 .AddDatabase("tododb");

builder.AddProject<Projects.TodoApp_TodoApi>("api")
       .WithReference(sql);

builder.Build().Run();
