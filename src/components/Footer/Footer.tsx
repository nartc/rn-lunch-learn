import * as React from 'react';
import { connect } from 'react-redux';
import { FilterType, todoActions } from '../../store/reducers/todos/todoReducer';
import { AppState } from '../../store/store';
import styles from './Footer.module.scss';

const mapStateToProps = (state: AppState) => ({
  itemsCount: state.todoState.todos.filter(todo => !todo.isCompleted).length,
  hasCompleted: state.todoState.todos.some(todo => todo.isCompleted),
  currentFilter: state.todoState.filter
});

const mapDispatchToProps = {
  setFilter: todoActions.setFilter,
  clearCompleted: todoActions.clearCompleted
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const Footer: React.FC<Props> = ({ itemsCount, clearCompleted, setFilter, hasCompleted, currentFilter }) => {
  const onFilterHandler = (type: FilterType) => () => {
    setFilter(type);
  };

  const filterButtonClass = (type: FilterType) => {
    return type === currentFilter ? `${ styles.filterBtn } ${ styles.border }` : styles.filterBtn;
  };

  return (
    <footer className={ styles.footer }>
      <span className={ styles.itemCount }>{ itemsCount } items left</span>
      <div className={ styles.filters }>
        <button className={ filterButtonClass('all') } type={ 'button' } onClick={ onFilterHandler('all') }>All</button>
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
      <div className={ styles.filters }>
        <button className={ `${ styles.clearCompleted } ${ hasCompleted ? '' : styles.hide }` }
                type={ 'button' }
                onClick={ clearCompleted }>
          Clear Completed
        </button>
      </div>
    </footer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
