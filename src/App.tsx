import React from 'react';
import styles from './App.module.scss';
import Title from './components/Title/Title';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoList from './components/Todo/TodoList/TodoList';
import Footer from './components/Footer/Footer';

export type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

type State = {
  todos: Todo[];
  filter: FilterType;
};

class App extends React.Component<{}, State> {

  state: State = {
    todos: [],
    filter: 'all'
  };

  addTodo = (content: string) => {
    const newTodo = {
      id: Date.now(),
      content,
      isCompleted: false
    };

    this.setState(prev => ({ todos: [...prev.todos, newTodo] }));
  };

  toggleAll = (completing: boolean) => {
    this.setState({ todos: this.state.todos.map(todo => ({ ...todo, isCompleted: completing })) });
  };

  toggleTodo = (id: number) => {
    const updatedTodos = this.state.todos.map(todo => {
      return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo };
    });
    this.setState({ todos: updatedTodos });
  };

  deleteTodo = (id: number) => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  };

  updateTodo = (id: number, content: string) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todo.id === id ? { ...todo, content } : { ...todo };
      })
    });
  };

  clearCompleted = () => {
    this.setState({ todos: this.state.todos.filter(todo => !todo.isCompleted) });
  };

  filter = (type: FilterType) => {
    this.setState({ filter: type });
  };

  get activeItemsCount(): number {
    return this.state.todos.filter(todo => !todo.isCompleted).length;
  }

  get hasCompleted(): boolean {
    return (this.state.todos.length - this.activeItemsCount) > 0;
  }

  render() {
    const { todos, filter } = this.state;

    const filteredTodos = todos.filter(todo => {
      return filter === 'completed'
        ? todo.isCompleted
        : filter === 'active'
          ? !todo.isCompleted
          : filter === 'all';
    });

    const isAllToggled = todos.every(todo => todo.isCompleted);

    return (
      <div className={ styles.wrapper }>
        <Title/>
        <div className={ styles.todoApp }>
          <TodoInput onSubmit={ this.addTodo }
                     onToggleAll={ this.toggleAll }
                     isAllToggled={ isAllToggled }/>
          <TodoList items={ filteredTodos } onToggle={ this.toggleTodo } onDelete={ this.deleteTodo } onUpdateTodo={ this.updateTodo }/>
          <Footer itemsCount={ this.activeItemsCount }
                  hasCompleted={ this.hasCompleted }
                  currentFilter={ filter }
                  onFilter={ this.filter }
                  onClearCompleted={ this.clearCompleted }/>
        </div>
      </div>
    );
  }
};

export default App;
