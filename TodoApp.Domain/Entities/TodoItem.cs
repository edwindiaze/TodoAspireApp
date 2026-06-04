namespace TodoApp.Domain.Entities;

public class TodoItem
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public bool IsComplete { get; set; }
}
