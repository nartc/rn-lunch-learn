import React, { createRef, RefObject } from 'react';
import { TodoConsumer, TodoContext } from '../../../context/todoContext';
import { Todo } from '../../../store/reducers/todos/todoReducer';
import styles from './TodoItem.module.scss';

type Props = {
  item: Todo;
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

  private readonly _editInputRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this._editInputRef = createRef();
  }

  private renderWithContext = (context: TodoContext | null) => {
    const { item } = this.props;
    const { isEdit, content } = this.state;
    const { actions } = context as TodoContext;

    const onSubmit = (id: number) => (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
      const key = event.nativeEvent instanceof KeyboardEvent ? event.nativeEvent.key : '';
      const { content } = this.state;

      if ((key !== 'Enter' && key !== 'Escape' && key !== '') || content === '' || !content) {
        return;
      }

      actions.updateTodo(id, content);
      this.setState({ isEdit: false });
    };

    const onItemDoubleClickHandler = () => {
      this.setState({ isEdit: !this.props.item.isCompleted }, () => {
        (this._editInputRef.current as HTMLInputElement).focus();
      });
    };

    return (
      <li className={ styles.todoItem }>
        { isEdit ? (
          <input type='text'
                 ref={ this._editInputRef }
                 value={ content }
                 onChange={ ({ target }) => this.setState({ content: target.value }) }
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

  render() {
    return (
      <TodoConsumer>
        { this.renderWithContext }
      </TodoConsumer>
    );
  }
};

export default TodoItem;
