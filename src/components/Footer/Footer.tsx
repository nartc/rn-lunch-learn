import * as React from 'react';
import { FilterType } from '../../App';
import styles from './Footer.module.scss';

type Props = {
  itemsCount: number;
  hasCompleted: boolean;
  currentFilter: FilterType;
  onFilter: (type: FilterType) => void;
  onClearCompleted: () => void;
};
const Footer: React.FC<Props> = ({ itemsCount, onClearCompleted, onFilter, hasCompleted, currentFilter }) => {
  console.log('Footer render');

  const onFilterHandler = (type: FilterType) => () => {
    onFilter(type);
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
                onClick={ onClearCompleted }>
          Clear Completed
        </button>
      </div>
    </footer>
  );
};

export default Footer;
