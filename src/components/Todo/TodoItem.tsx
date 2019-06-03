import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../context/todoContext';
import { Todo } from '../../store/reducers/todos/todoReducer';

const useStyles = makeStyles({
  todoItem: {
    position: 'relative',
    fontSize: 24,
    borderBottom: '1px solid #ededed',
    '& label': {
      position: 'absolute',
      width: 40,
      height: 40,
      top: 0,
      bottom: 0,
      margin: 'auto 0',
      border: 'none',
      outline: 'none',
      backgroundImage: 'url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center left',
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      '&.completed': {
        backgroundImage: 'url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E)',
        '& + .item': {
          textDecoration: 'line-through',
          color: '#ddd'
        }
      },
      '& + .item': {
        wordBreak: 'break-all',
        padding: '15px 15px 15px 60px',
        display: 'block',
        lineHeight: 1.2,
        fontWeight: 300,
        transition: 'color 0.4s ease-in-out, text-decoration 0.2s ease-in-out'
      }
    },
    '&:last-child': {
      borderBottom: 'none'
    },
    '& .destroy': {
      display: 'none',
      position: 'absolute',
      top: 0,
      right: 10,
      bottom: 0,
      width: 40,
      height: 40,
      fontSize: 30,
      color: '#cc9a9a',
      margin: 'auto 0 11px',
      transition: 'color 0.2s ease-in-out',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent'
    },
    '&:hover': {
      '& .destroy': {
        display: 'block',
        '&::after': {
          content: '"x"'
        }
      }
    },
  },
  toggleCheckbox: {
    opacity: 0,
    position: 'absolute'
  },
  editInput: {
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    padding: '0 0 0 45px',
    boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.003)',
    margin: 0,
    width: '100%',
    fontSize: 24,
    fontFamily: 'inherit',
    fontWeight: 200,
    lineHeight: '1.4em'
  }
});

type Props = {
  item: Todo;
};

const TodoItem: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const { actions } = useTodoContext();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(item.content);
  const _editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit) {
      (_editInputRef.current as HTMLInputElement).focus();
    }
  }, [isEdit]);

  const onSubmit = (id: number) => (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const key = event.nativeEvent instanceof KeyboardEvent ? event.nativeEvent.key : '';
    if ((key !== 'Enter' && key !== 'Escape' && key !== '') || content === '' || !content) {
      return;
    }

    actions.updateTodo(id, content);
    setIsEdit(false);
  };

  const onItemDoubleClickHandler = () => {
    setIsEdit(!item.isCompleted);
  };

  return (
    <li className={ classes.todoItem }>
      { isEdit ? (
        <input type='text'
               ref={ _editInputRef }
               value={ content }
               onChange={ ({ target }) => setContent(target.value) }
               onKeyUp={ onSubmit(item.id) }
               className={ classes.editInput }/>
      ) : (
        <>
          <label htmlFor={ `toggle_${ item.id }` } className={ item.isCompleted ? 'completed' : '' }>
            <input type="checkbox"
                   id={ `toggle_${ item.id }` }
                   className={ classes.toggleCheckbox }
                   onChange={ () => actions.toggleTodo(item.id) }/>
          </label>
          <span className={ 'item' }
                onDoubleClick={ onItemDoubleClickHandler }>{ item.content }</span>
          <button className={ 'destroy' } type={ 'button' } onClick={ () => actions.deleteTodo(item.id) }/>
        </>
      ) }
    </li>
  );
};

export default TodoItem;
