import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useTodoContext } from '../../context/todoContext';
import { FilterType } from '../../store/reducers/todos/todoReducer';

const useStyles = makeStyles({
  footer: {
    color: '#777',
    padding: '10px 15px',
    height: 20,
    textAlign: 'center',
    borderTop: '1px solid #e6e6e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      height: 50,
      overflow: 'hidden',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
    }
  },
  itemCount: {
    fontSize: 14,
    fontWeight: 200
  },
  btn: {
    fontSize: 14,
    fontWeight: 200,
    border: '1px solid transparent',
    padding: '5px 10px',
    visibility: 'visible',
    transition: 'border-color 0.2s ease-in-out',
    outline: 'none',
    cursor: 'pointer',
    '&.border': {
      borderColor: 'rgba(175, 47, 47, 0.2)',
      borderRadius: '0.25rem'
    },
    '&.hide': {
      visibility: 'hidden'
    }
  },
  filters: {
    position: 'relative'
  }
});

const Footer: React.FC = () => {
  const classes = useStyles();
  const { state: { todos, filter }, actions } = useTodoContext();

  const itemsCount = todos.filter(todo => !todo.isCompleted).length;
  const hasCompleted = todos.some(todo => todo.isCompleted);

  const filterButtonClass = (type: FilterType) => {
    return type === filter ? `${ classes.btn } border` : classes.btn;
  };

  const onFilterHandler = (type: FilterType) => () => {
    actions.setFilter(type);
  };

  return (
    <footer className={ classes.footer }>
      <span className={ classes.itemCount }>{ itemsCount } items left</span>
      <div className={ classes.filters }>
        <button className={ filterButtonClass('all') }
                type={ 'button' }
                onClick={ onFilterHandler('all') }>All
        </button>
        <button className={ filterButtonClass('active') }
                type={ 'button' }
                onClick={ onFilterHandler('active') }>Active
        </button>
        <button className={ filterButtonClass('completed') }
                type={ 'button' }
                onClick={ onFilterHandler('completed') }>
          Completed
        </button>
      </div>
      <div className={ classes.filters }>
        <button className={ `${ classes.btn } ${ hasCompleted ? '' : 'hide' }` }
                type={ 'button' }
                onClick={ actions.clearCompleted }>
          Clear Completed
        </button>
      </div>
    </footer>
  );
};

export default Footer;
