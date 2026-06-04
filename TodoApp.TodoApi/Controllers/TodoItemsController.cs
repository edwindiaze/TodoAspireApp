using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.DTOs;
using TodoApp.Application.UseCases;

namespace TodoApp.TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoItemsController(TodoService service) : ControllerBase
{
    private readonly TodoService _service = service;

    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await _service.GetAll());

    [HttpPost]
    public async Task<IActionResult> Post(TodoItemDto dto)
    {
        var created = await _service.Create(dto);
        return Ok(created);
    }
}