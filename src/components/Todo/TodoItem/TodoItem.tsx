import React from 'react';
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

  private renderWithContext = (context: TodoContext | null) => {
    const { item } = this.props;
    const { isEdit, content } = this.state;
    const { actions } = context as TodoContext;

    const onEnterKeyUpHandler = (id: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      const { content } = this.state;

      if (key !== 'Enter' || content === '' || !content) {
        return;
      }

      actions.updateTodo(id, content);
      this.setState({ isEdit: false });
    };

    return (
      <li className={ styles.todoItem }>
        { isEdit ? (
          <input type='text'
                 value={ content }
                 onChange={ ({ target }) => this.setState({ content: target.value }) }
                 onKeyUp={ onEnterKeyUpHandler(item.id) }
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
                  onDoubleClick={ () => this.setState({ isEdit: !this.props.item.isCompleted }) }>{ item.content }</span>
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
