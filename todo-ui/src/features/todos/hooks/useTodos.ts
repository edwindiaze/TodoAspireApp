import { useMemo } from 'react';
import { useTodoStore } from '../stores/todoStore';

// Like a ViewModel constructor - composes store access
export function useTodos() {
  // Zustand selectors = like property getters (prevents unnecessary re-renders)
  const todos = useTodoStore(state => state.todos);
  const filter = useTodoStore(state => state.filter);
  const addTodo = useTodoStore(state => state.addTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const setFilter = useTodoStore(state => state.setFilter);
  const clearCompleted = useTodoStore(state => state.clearCompleted);

  // Derived state (like computed properties)
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const completed = todos.filter(t => t.completed).length;
    return {
      total: todos.length,
      active: todos.length - completed,
      completed,
    };
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  } as const;  // readonly tuple-like return
}