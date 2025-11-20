import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  loadingIds?: number[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  onToggle,
  onDelete,
  loadingIds = [],
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        isUpdating={loadingIds.includes(todo.id)}
      />
    ))}
  </section>
);
