import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';

type Props = {
  activeTodos: number;
  todosLength: number;
  onAdd: (title: string) => void;
  onToggleAll: () => void;
  disabled?: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  activeTodos,
  todosLength,
  onAdd,
  onToggleAll,
  disabled = false,
}) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (title === '' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [title]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = title.trim();

      if (!trimmed) {
        return;
      }

      onAdd(trimmed);
      setTitle('');
    },
    [title, onAdd],
  );

  const allCompleted = todosLength > 0 && activeTodos === 0;

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
        disabled={disabled || todosLength === 0}
        aria-label="Toggle all todos"
      />

      <form data-cy="NewTodoForm" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Escape' && setTitle('')}
          disabled={disabled}
        />
        <button type="submit" hidden disabled={!title.trim() || disabled} />
      </form>
    </header>
  );
};
