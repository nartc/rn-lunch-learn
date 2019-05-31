import React from 'react';
import { TodoConsumer, TodoContext, TodoContextState } from '../../../context/todoContext';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

const getFilteredTodos = ({ todos, filter }: TodoContextState) => {
  return todos.filter(todo => {
    return filter === 'completed'
      ? todo.isCompleted
      : filter === 'active'
        ? !todo.isCompleted
        : filter === 'all';
  });
};

const TodoList: React.FC = () => {

  const renderWithContext = (context: TodoContext | null) => {
    const { state } = context as TodoContext;

    const items = getFilteredTodos(state);

    return (
      <ul className={ styles.todoList }>
        { items.map(item => <TodoItem item={ item } key={ item.id }/>) }
      </ul>
    );
  };

  return (
    <TodoConsumer>
      { renderWithContext }
    </TodoConsumer>
  );
};

export default TodoList;
