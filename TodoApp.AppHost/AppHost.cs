var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.TodoApp_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("todo-ui", "../frontend")
    .WithReference(api)
    .WaitFor(api);

api.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
