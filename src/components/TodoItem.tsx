import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  isUpdating?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onDelete,
  isUpdating = false,
}) => (
  <div
    data-cy="Todo"
    className={classNames('todo', { completed: todo.completed })}
  >
    {/* Hidden loader required by Cypress */}
    <div
      data-cy="TodoLoader"
      className={classNames('loader', { hidden: !isUpdating })}
    />

    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor={`todo-status-${todo.id}`} className="todo__status-label">
      <input
        id={`todo-status-${todo.id}`}
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        disabled={isUpdating}
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={() => onDelete(todo.id)}
      disabled={isUpdating}
    >
      ×
    </button>
  </div>
);
