import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React from 'react';
import { TodoConsumer, TodoContext } from '../../context/todoContext';

const styles = createStyles({
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'inset 0 -2px 1px rgba(0, 0, 0, 0.03)',
    '& label': {
      position: 'relative',
      width: 50,
      height: 50,
      transform: 'rotate(90deg)',
      '&::before': {
        content: '"❯"',
        fontSize: 22,
        color: '#e6e6e6',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'color 0.2s ease-in-out'
      },
      '&.toggled': {
        '&::before': {
          color: '#444'
        }
      }
    }
  },
  toggleAllCheckbox: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0
  },
  todoInput: {
    border: 'none',
    outline: 'none',
    background: 'rgba(0, 0, 0, 0.003)',
    position: 'relative',
    margin: 0,
    width: '100%',
    fontSize: 24,
    fontFamily: 'inherit',
    fontWeight: 200,
    lineHeight: '1.4em',
    boxSizing: 'border-box',
    '&::placeholder': {
      color: '#aaa',
      fontStyle: 'italic',
      fontWeight: 100
    }
  }
});

type State = {
  content: string;
};

class TodoInput extends React.Component<WithStyles<typeof styles>, State> {

  state = {
    content: ''
  };

  private renderWithContext = (context: TodoContext | null) => {
    const { classes } = this.props;
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
      <div className={ classes.inputWrapper }>
        <label htmlFor={ 'toggleAll' } className={ isAllToggled ? 'toggled' : '' }>
          <input type='checkbox'
                 id={ 'toggleAll' }
                 className={ classes.toggleAllCheckbox }
                 onChange={ onChangeHandler }/>
        </label>
        <input className={ classes.todoInput }
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

export default withStyles(styles)(TodoInput);
