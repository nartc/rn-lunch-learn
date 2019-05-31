import React from 'react';
import styles from './TodoItem.module.scss';

class TodoItem extends React.Component {

  render() {
    const isEdit = false;
    const isCompleted = false;
    return (
      <li className={ styles.todoItem }>
        { isEdit ? (
          <input type='text'
                 value={ 'Some todo' }
                 className={ styles.editInput }/>
        ) : (
          <>
            <label htmlFor={ `toggle_${ 123 }` } className={ isCompleted ? styles.completed : '' }>
              <input type="checkbox"
                     id={ `toggle_${ 123 }` }
                     className={ styles.toggleCheckbox }/>
            </label>
            <span className={ styles.item }>Some todo</span>
            <button className={ styles.destroy } type={ 'button' }/>
          </>
        ) }
      </li>
    );
  }
};

export default TodoItem;
