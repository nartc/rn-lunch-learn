import React from 'react';
import { TodoContextState, useTodoContext } from '../../../context/todoContext';
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
  const { state } = useTodoContext();
  const items = getFilteredTodos(state);

  return (
    <ul className={ styles.todoList }>
      { items.map(item => <TodoItem item={ item } key={ item.id }/>) }
    </ul>
  );
};

export default TodoList;
