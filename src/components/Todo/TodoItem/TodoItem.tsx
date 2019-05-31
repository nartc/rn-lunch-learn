import React from 'react';
import { connect } from 'react-redux';
import { Todo, todoActions } from '../../../store/reducers/todos/todoReducer';
import styles from './TodoItem.module.scss';

const mapDispatchToProps = {
  toggleTodo: todoActions.toggleTodo,
  deleteTodo: todoActions.deleteTodo,
  updateTodo: todoActions.updateTodo
};

type Props = {
  item: Todo;
} & typeof mapDispatchToProps;
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

    this.props.updateTodo(id, content);
    this.setState({ isEdit: false });
  };

  render() {
    const { item, toggleTodo, deleteTodo } = this.props;
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
                     onChange={ () => toggleTodo(item.id) }/>
            </label>
            <span className={ styles.item }
                  onDoubleClick={ () => this.setState({ isEdit: !this.props.item.isCompleted }) }>{ item.content }</span>
            <button className={ styles.destroy } type={ 'button' } onClick={ () => deleteTodo(item.id) }/>
          </>
        ) }
      </li>
    );
  }
};

export default connect(null, mapDispatchToProps)(TodoItem);
