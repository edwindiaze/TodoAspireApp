import { useTodos } from './features/todos/hooks/useTodos';
import { TodoForm } from './features/todos/components/TodoForm';
import { TodoList } from './features/todos/components/TodoList';
import { TodoFilters } from './features/todos/components/TodoFilters';
import './App.css';

export default function App() {
  const vm = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>todos</h1>
      </header>
      
      <main className="app-main">
        <TodoForm onAdd={vm.addTodo} />
        
        <TodoList
          todos={vm.todos}
          onToggle={vm.toggleTodo}
          onDelete={vm.deleteTodo}
        />
        
        {vm.allTodos.length > 0 && (
          <TodoFilters
            currentFilter={vm.filter}
            stats={vm.stats}
            onFilterChange={vm.setFilter}
            onClearCompleted={vm.clearCompleted}
          />
        )}
      </main>
    </div>
  );
}