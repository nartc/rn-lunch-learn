import React, { useRef, useState } from 'react';
import { useTodoContext } from '../../../context/todoContext';
import { Todo } from '../../../store/reducers/todos/todoReducer';
import styles from './TodoItem.module.scss';

type Props = {
  item: Todo;
};

const TodoItem: React.FC<Props> = ({ item }) => {
  const { actions } = useTodoContext();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(item.content);
  const _editInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (id: number) => (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const key = event.nativeEvent instanceof KeyboardEvent ? event.nativeEvent.key : '';
    if ((key !== 'Enter' && key !== 'Escape' && key !== '') || content === '' || !content) {
      return;
    }

    actions.updateTodo(id, content);
    setIsEdit(false);
  };

  const onItemDoubleClickHandler = () => {
    setIsEdit(!item.isCompleted);
    (_editInputRef.current as HTMLInputElement).focus();
  };

  return (
    <li className={ styles.todoItem }>
      { isEdit ? (
        <input type='text'
               ref={ _editInputRef }
               value={ content }
               onChange={ ({ target }) => setContent(target.value) }
               onKeyUp={ onSubmit(item.id) }
               className={ styles.editInput }/>
      ) : (
        <>
          <label htmlFor={ `toggle_${ item.id }` } className={ item.isCompleted ? styles.completed : '' }>
            <input type="checkbox"
                   id={ `toggle_${ item.id }` }
                   className={ styles.toggleCheckbox }
                   onChange={ () => actions.toggleTodo(item.id) }/>
          </label>
          <span className={ styles.item }
                onDoubleClick={ onItemDoubleClickHandler }>{ item.content }</span>
          <button className={ styles.destroy } type={ 'button' } onClick={ () => actions.deleteTodo(item.id) }/>
        </>
      ) }
    </li>
  );
};

export default TodoItem;
