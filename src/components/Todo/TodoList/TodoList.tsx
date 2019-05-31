import React from 'react';
import { Todo } from '../../../App';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

type Props = {
  items: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateTodo: (id: number, content: string) => void;
};
const TodoList: React.FC<Props> = ({ items, onToggle, onDelete, onUpdateTodo }) => {
  return (
    <ul className={ styles.todoList }>
      { items.map(item => (
        <TodoItem item={ item }
                  key={ item.id }
                  onToggle={ onToggle }
                  onDelete={ onDelete }
                  onUpdateTodo={ onUpdateTodo }/>
      )) }
    </ul>
  );
};

export default TodoList;
