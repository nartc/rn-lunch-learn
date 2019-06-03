import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Title from './components/Title/Title';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoList from './components/Todo/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { TodoContextActions, TodoProvider } from './context/todoContext';
import { FilterType, Todo } from './store/reducers/todos/todoReducer';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: '0 200px'
  },
  todoApp: {
    position: 'relative',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
    background: 'white'
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const actions: TodoContextActions = {
    addTodo: content => {
      const newTodo: Todo = {
        isCompleted: false,
        id: Date.now(),
        content
      };
      setTodos(prevState => [...prevState, newTodo]);
    },
    updateTodo: (id, content) => {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, content } : { ...todo }));
    },
    deleteTodo: id => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    },
    toggleTodo: id => {
      setTodos(prev => prev.map(todo => todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : { ...todo }));
    },
    toggleAll: completing => {
      setTodos(prev => prev.map(todo => ({ ...todo, isCompleted: completing })));
    },
    clearCompleted: () => {
      setTodos(prev => prev.filter(todo => !todo.isCompleted));
    },
    setFilter
  };

  return (
    <TodoProvider value={ { state: { todos, filter }, actions } }>
      <div className={ classes.wrapper }>
        <Title/>
        <div className={ classes.todoApp }>
          <TodoInput/>
          <TodoList/>
          <Footer/>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
