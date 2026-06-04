using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Abstractions;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Persistence;

namespace TodoApp.Infrastructure.Repositories;

public class TodoRepository(TodoContext ctx) : ITodoRepository
{
    private readonly TodoContext _ctx = ctx;

    public async Task<List<TodoItem>> GetAllAsync()
        => await _ctx.TodoItems.AsNoTracking().ToListAsync();

    public Task<TodoItem?> GetByIdAsync(long id)
        => _ctx.TodoItems.FindAsync(id).AsTask();

    public async Task<TodoItem> AddAsync(TodoItem item)
    {
        _ctx.Add(item);
        await _ctx.SaveChangesAsync();
        return item;
    }

    public async Task<bool> UpdateAsync(TodoItem item)
    {
        if (!await _ctx.TodoItems.AnyAsync(x => x.Id == item.Id))
            return false;

        _ctx.Entry(item).State = EntityState.Modified;
        await _ctx.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(long id)
    {
        var e = await _ctx.TodoItems.FindAsync(id);
        if (e is null) return false;

        _ctx.Remove(e);
        await _ctx.SaveChangesAsync();
        return true;
    }
}