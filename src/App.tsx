import './App.css'

import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Filters } from './components/Filters';
import type { FilterType } from './types/todo';
import './App.css';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="todo-card">
        <TodoInput onAdd={addTodo} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        {todos.length > 0 && (
          <Filters
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            onClearCompleted={clearCompleted}
            hasCompleted={hasCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
