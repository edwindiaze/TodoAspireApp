import { useState } from 'react';
import type { SubmitEvent } from 'react';

interface Props {
  onAdd: (title: string) => Promise<void>;
}

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onAdd(title);
      setTitle('');
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={!title.trim() || isLoading}
        className="btn btn-primary"
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}