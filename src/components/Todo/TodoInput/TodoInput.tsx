import React from 'react';
import { connect } from 'react-redux';
import { todoActions } from '../../../store/reducers/todos/todoReducer';
import { AppState } from '../../../store/store';
import styles from './TodoInput.module.scss';

const mapStateToProps = (state: AppState) => ({
  isAllToggled: state.todoState.todos.every(todo => todo.isCompleted),
});

const mapDispatchToProps = {
  addTodo: todoActions.addTodo,
  toggleAll: todoActions.toggleAll
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {
  content: string;
};

class TodoInput extends React.Component<Props, State> {

  state = {
    content: ''
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    this.props.toggleAll(checked);
  };

  onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ content: value });
  };

  onEnterKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const { content } = this.state;
    if (key !== 'Enter' || content === '' || !content) {
      return;
    }

    this.props.addTodo(this.state.content);
    this.setState({ content: '' });
  };

  render() {
    console.log('input render');
    const { content } = this.state;
    const { isAllToggled } = this.props;

    return (
      <div className={ styles.inputWrapper }>
        <label htmlFor={ 'toggleAll' } className={ isAllToggled ? styles.toggled : '' }>
          <input type='checkbox'
                 id={ 'toggleAll' }
                 className={ styles.toggleAllCheckbox }
                 onChange={ this.onChangeHandler }/>
        </label>
        <input className={ styles.todoInput }
               value={ content }
               placeholder={ 'What needs to be done?' }
               onChange={ this.onInputChangeHandler } onKeyUp={ this.onEnterKeyUpHandler }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
