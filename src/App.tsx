import React from 'react';
import styles from './App.module.scss';
import Title from './components/Title/Title';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoList from './components/Todo/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { TodoContextActions, TodoContextState, TodoProvider } from './context/todoContext';
import { Todo } from './store/reducers/todos/todoReducer';

type State = TodoContextState;

class App extends React.Component<{}, State> {

  state: State = {
    todos: [],
    filter: 'all'
  };

  actions: TodoContextActions = {
    addTodo: content => {
      const newTodo: Todo = {
        isCompleted: false,
        id: Date.now(),
        content
      };
      this.setState(prev => ({ todos: [...prev.todos, newTodo] }));
    },
    updateTodo: (id, content) => {
      const updatedTodos = this.state.todos.map(todo => todo.id === id ? { ...todo, content } : { ...todo });
      this.setState({ todos: updatedTodos });
    },
    deleteTodo: id => {
      this.setState(prev => ({ todos: prev.todos.filter(todo => todo.id !== id) }));
    },
    toggleTodo: id => {
      this.setState(prev => ({
        todos: prev.todos.map(todo => todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo })
      }));
    },
    toggleAll: completing => {
      this.setState(prev => ({ todos: prev.todos.map(todo => ({ ...todo, isCompleted: completing })) }));
    },
    clearCompleted: () => {
      this.setState(prev => ({ todos: prev.todos.filter(todo => !todo.isCompleted) }));
    },
    setFilter: type => {
      this.setState({ filter: type });
    }
  };

  render() {
    return (
      <TodoProvider value={ { state: this.state, actions: this.actions } }>
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
  }
}

export default App;
