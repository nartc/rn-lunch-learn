import React, { useState } from 'react';
import styles from './App.module.scss';
import Title from './components/Title/Title';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoList from './components/Todo/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { TodoContextActions, TodoContextState, TodoProvider } from './context/todoContext';
import { FilterType, Todo } from './store/reducers/todos/todoReducer';

type State = TodoContextState;

const App: React.FC = () => {

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
      <div className={ styles.wrapper }>
        <Title/>
        <div className={ styles.todoApp }>
          <TodoInput/>
          <TodoList/>
          <Footer/>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
