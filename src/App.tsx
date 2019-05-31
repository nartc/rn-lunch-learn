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

const App: React.FC = () => {
  return (
    <div className={ styles.wrapper }>
      <Title/>
      <div className={ styles.todoApp }>
        <TodoInput/>
        <TodoList/>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
