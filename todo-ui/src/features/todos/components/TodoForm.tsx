import { useState } from 'react';
import type { SubmitEvent } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
        autoFocus
      />
      <button 
        type="submit" 
        disabled={!title.trim()}
        className="btn btn-primary"
      >
        Add
      </button>
    </form>
  );
}