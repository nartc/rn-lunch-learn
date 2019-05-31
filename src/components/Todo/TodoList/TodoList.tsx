import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

class TodoList extends React.Component {
  render() {
    return (
      <ul className={ styles.todoList }>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
      </ul>
    );
  }
};

export default TodoList;
