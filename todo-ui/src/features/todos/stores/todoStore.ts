import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Todo, TodoId, TodoFilter, TodoStats } from '../types';

// Like a C# class with private fields and public methods
interface TodoState {
  // State (private backing fields)
  todos: Todo[];
  filter: TodoFilter;
  
  // Computed (like C# properties with get)
  getFilteredTodos: () => Todo[];
  getStats: () => TodoStats;
  
  // Actions (like C# methods)
  addTodo: (title: string) => void;
  toggleTodo: (id: TodoId) => void;
  deleteTodo: (id: TodoId) => void;
  setFilter: (filter: TodoFilter) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>()(
  immer((set, get) => ({
    // Initial state
    todos: [],
    filter: 'all',

    // Computed (memoized via selector pattern in components)
    getFilteredTodos: () => {
      const { todos, filter } = get();
      switch (filter) {
        case 'active': return todos.filter(t => !t.completed);
        case 'completed': return todos.filter(t => t.completed);
        default: return todos;
      }
    },

    getStats: () => {
      const { todos } = get();
      const completed = todos.filter(t => t.completed).length;
      return {
        total: todos.length,
        active: todos.length - completed,
        completed,
      };
    },

    // Actions with Immer for immutable updates
    addTodo: (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      
      set(state => {
        state.todos.push({
          id: crypto.randomUUID(),
          title: trimmed,
          completed: false,
          createdAt: Date.now(),
        });
      });
    },

    toggleTodo: (id: TodoId) => {
      set(state => {
        const todo = state.todos.find(t => t.id === id);
        if (todo) todo.completed = !todo.completed;
      });
    },

    deleteTodo: (id: TodoId) => {
      set(state => {
        state.todos = state.todos.filter(t => t.id !== id);
      });
    },

    setFilter: (filter: TodoFilter) => {
      set(state => { state.filter = filter; });
    },

    clearCompleted: () => {
      set(state => {
        state.todos = state.todos.filter(t => !t.completed);
      });
    },
  }))
);