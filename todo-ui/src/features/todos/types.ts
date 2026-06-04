export type TodoId = string;  // Branded type (like a strong ID in C#)

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
  createdAt: number;  // Unix timestamp (JSON-friendly)
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}