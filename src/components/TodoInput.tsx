import React, { useState } from 'react';

interface TodoInputProps {
    onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form className="todo-input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
            />
            <button type="submit" className="add-button" disabled={!text.trim()}>
                Add
            </button>
        </form>
    );
};
