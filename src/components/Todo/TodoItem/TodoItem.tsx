import React from 'react';
import { Todo } from '../../../App';
import styles from './TodoItem.module.scss';

type Props = {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateTodo: (id: number, content: string) => void;
};
type State = {
  isEdit: boolean;
  content: string;
};

class TodoItem extends React.Component<Props, State> {
  state: State = {
    isEdit: false,
    content: this.props.item.content
  };

  onEnterKeyUpHandler = (id: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const { content } = this.state;

    if (key !== 'Enter' || content === '' || !content) {
      return;
    }

    this.props.onUpdateTodo(id, content);
    this.setState({ isEdit: false });
  };

  render() {
    const { item, onToggle, onDelete } = this.props;
    const { isEdit, content } = this.state;
    return (
      <li className={ styles.todoItem }>
        { isEdit ? (
          <input type='text'
                 value={ content }
                 onChange={ ({ target }) => this.setState({ content: target.value }) }
                 onKeyUp={ this.onEnterKeyUpHandler(item.id) }
                 className={ styles.editInput }/>
        ) : (
          <>
            <label htmlFor={ `toggle_${ item.id }` } className={ item.isCompleted ? styles.completed : '' }>
              <input type="checkbox"
                     id={ `toggle_${ item.id }` }
                     className={ styles.toggleCheckbox }
                     onChange={ () => onToggle(item.id) }/>
            </label>
            <span className={ styles.item }
                  onDoubleClick={ () => this.setState({ isEdit: !this.props.item.isCompleted }) }>{ item.content }</span>
            <button className={ styles.destroy } type={ 'button' } onClick={ () => onDelete(item.id) }/>
          </>
        ) }
      </li>
    );
  }
};

export default TodoItem;
