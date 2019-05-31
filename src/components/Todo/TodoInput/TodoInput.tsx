import React from 'react';
import styles from './TodoInput.module.scss';

const TodoInput: React.FC = () => {

  const isAllToggled = false;

  return (
    <div className={ styles.inputWrapper }>
      <label htmlFor={ 'toggleAll' } className={ isAllToggled ? styles.toggled : '' }>
        <input type='checkbox'
               id={ 'toggleAll' }
               className={ styles.toggleAllCheckbox }/>
      </label>
      <input className={ styles.todoInput }
             placeholder={ 'What needs to be done?' }/>
    </div>
  );
};

export default TodoInput;
