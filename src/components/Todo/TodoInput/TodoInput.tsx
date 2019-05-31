import React from 'react';
import styles from './TodoInput.module.scss';

type Props = {
  isAllToggled: boolean;
  onSubmit: (content: string) => void;
  onToggleAll: (completing: boolean) => void;
};
type State = {
  content: string;
};

class TodoInput extends React.Component<Props, State> {

  state = {
    content: ''
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    this.props.onToggleAll(checked);
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

    this.props.onSubmit(this.state.content);
    this.setState({ content: '' });
  };

  render() {
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
};

export default TodoInput;
