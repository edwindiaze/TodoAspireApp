using TodoApp.Domain.Entities;

namespace TodoApp.Application.Abstractions;

public interface ITodoRepository
{
    Task<List<TodoItem>> GetAllAsync();
    Task<TodoItem?> GetByIdAsync(long id);
    Task<TodoItem> AddAsync(TodoItem item);
    Task<bool> UpdateAsync(TodoItem item);
    Task<bool> DeleteAsync(long id);
}