import React from 'react';
import { TodoConsumer, TodoContext } from '../../../context/todoContext';
import styles from './TodoInput.module.scss';

type State = {
  content: string;
};

class TodoInput extends React.Component<{}, State> {

  state = {
    content: ''
  };

  private renderWithContext = (context: TodoContext | null) => {
    const { content } = this.state;
    const { state: { todos }, actions } = context as TodoContext;
    const isAllToggled = todos.every(todo => todo.isCompleted);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      actions.toggleAll(checked);
    };

    const onEnterKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      const { content } = this.state;
      if (key !== 'Enter' || content === '' || !content) {
        return;
      }

      actions.addTodo(content);
      this.setState({ content: '' });
    };

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      this.setState({ content: value });
    };

    return (
      <div className={ styles.inputWrapper }>
        <label htmlFor={ 'toggleAll' } className={ isAllToggled ? styles.toggled : '' }>
          <input type='checkbox'
                 id={ 'toggleAll' }
                 className={ styles.toggleAllCheckbox }
                 onChange={ onChangeHandler }/>
        </label>
        <input className={ styles.todoInput }
               value={ content }
               placeholder={ 'What needs to be done?' }
               onChange={ onInputChangeHandler } onKeyUp={ onEnterKeyUpHandler }/>
      </div>
    );
  };

  render() {
    return (
      <TodoConsumer>
        { this.renderWithContext }
      </TodoConsumer>
    );
  }
}

export default TodoInput;
