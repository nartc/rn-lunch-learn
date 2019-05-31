import * as React from 'react';
import { TodoConsumer, TodoContext } from '../../context/todoContext';
import { FilterType } from '../../store/reducers/todos/todoReducer';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const renderWithContext = (context: TodoContext | null) => {
    const { state: { todos, filter }, actions } = context as TodoContext;

    const itemsCount = todos.filter(todo => !todo.isCompleted).length;
    const hasCompleted = todos.some(todo => todo.isCompleted);

    const filterButtonClass = (type: FilterType) => {
      return type === filter ? `${ styles.filterBtn } ${ styles.border }` : styles.filterBtn;
    };

    const onFilterHandler = (type: FilterType) => () => {
      actions.setFilter(type);
    };

    return (
      <footer className={ styles.footer }>
        <span className={ styles.itemCount }>{ itemsCount } items left</span>
        <div className={ styles.filters }>
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
        <div className={ styles.filters }>
          <button className={ `${ styles.clearCompleted } ${ hasCompleted ? '' : styles.hide }` }
                  type={ 'button' }
                  onClick={ actions.clearCompleted }>
            Clear Completed
          </button>
        </div>
      </footer>
    );
  };

  return (
    <TodoConsumer>
      { renderWithContext }
    </TodoConsumer>
  );
};

export default Footer;
