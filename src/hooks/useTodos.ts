import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem('todos');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse todos', e);
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
    };
};
