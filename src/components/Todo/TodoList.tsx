import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { TodoContextState, useTodoContext } from '../../context/todoContext';
import TodoItem from './TodoItem';

const useStyles = makeStyles({
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
});

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
  const classes = useStyles();
  const { state } = useTodoContext();
  const items = getFilteredTodos(state);

  return (
    <ul className={ classes.list }>
      { items.map(item => <TodoItem item={ item } key={ item.id }/>) }
    </ul>
  );
};

export default TodoList;
