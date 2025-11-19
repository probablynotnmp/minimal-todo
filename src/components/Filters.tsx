import React from 'react';
import type { FilterType } from '../types/todo';

interface FiltersProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    activeCount: number;
    onClearCompleted: () => void;
    hasCompleted: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
    currentFilter,
    onFilterChange,
    activeCount,
    onClearCompleted,
    hasCompleted,
}) => {
    return (
        <div className="filters-container">
            <span className="todo-count">
                <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
            </span>
            <div className="filters">
                {(['all', 'active', 'completed'] as FilterType[]).map((filter) => (
                    <button
                        key={filter}
                        className={`filter-btn ${currentFilter === filter ? 'selected' : ''}`}
                        onClick={() => onFilterChange(filter)}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
            {hasCompleted && (
                <button className="clear-completed" onClick={onClearCompleted}>
                    Clear completed
                </button>
            )}
        </div>
    );
};
