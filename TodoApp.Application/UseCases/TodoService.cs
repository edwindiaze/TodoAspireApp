using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.UseCases;

public class TodoService(ITodoRepository repo)
{
    private readonly ITodoRepository _repo = repo;

    public async Task<List<TodoItemDto>> GetAll()
        => (await _repo.GetAllAsync())
            .Select(x => new TodoItemDto(x.Id, x.Name, x.IsComplete))
            .ToList();

    public async Task<TodoItemDto?> Get(long id)
    {
        var x = await _repo.GetByIdAsync(id);
        return x is null ? null : new(x.Id, x.Name, x.IsComplete);
    }

    public async Task<TodoItemDto> Create(TodoItemDto dto)
    {
        var entity = new TodoItem { Name = dto.Name, IsComplete = dto.IsComplete };
        var created = await _repo.AddAsync(entity);
        return new(created.Id, created.Name, created.IsComplete);
    }

    public Task<bool> Update(long id, TodoItemDto dto)
        => id != dto.Id
            ? Task.FromResult(false)
            : _repo.UpdateAsync(new TodoItem
            {
                Id = dto.Id,
                Name = dto.Name,
                IsComplete = dto.IsComplete
            });

    public Task<bool> Delete(long id) => _repo.DeleteAsync(id);
}