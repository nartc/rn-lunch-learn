import React from 'react';
import { connect } from 'react-redux';
import { TodoState } from '../../../store/reducers/todos/todoReducer';
import { AppState } from '../../../store/store';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

const getFilteredTodos = ({ todos, filter }: TodoState) => {
  return todos.filter(todo => {
    return filter === 'completed'
      ? todo.isCompleted
      : filter === 'active'
        ? !todo.isCompleted
        : filter === 'all';
  });
};

const mapStateToProps = (state: AppState) => ({
  items: getFilteredTodos(state.todoState)
});

type Props = ReturnType<typeof mapStateToProps>;
const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className={ styles.todoList }>
      { items.map(item => <TodoItem item={ item } key={ item.id }/>) }
    </ul>
  );
};

export default connect(mapStateToProps)(TodoList);
