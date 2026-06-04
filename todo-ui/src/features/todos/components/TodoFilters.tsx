import type { TodoFilter, TodoStats } from '../types';

interface Props {
  currentFilter: TodoFilter;
  stats: TodoStats;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({ 
  currentFilter, 
  stats, 
  onFilterChange, 
  onClearCompleted 
}: Props) {
  return (
    <div className="todo-filters">
      <span className="todo-count">
        {stats.active} {stats.active === 1 ? 'item' : 'items'} left
      </span>
      
      <div className="filter-group">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`filter-btn ${currentFilter === value ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {stats.completed > 0 && (
        <button 
          onClick={onClearCompleted}
          className="btn btn-text"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}