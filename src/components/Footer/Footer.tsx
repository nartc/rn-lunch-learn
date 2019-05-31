import * as React from 'react';
import { FilterType } from '../../App';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  console.log('Footer render');

  const filterButtonClass = (type: FilterType) => {
    return type === 'all' ? `${ styles.filterBtn } ${ styles.border }` : styles.filterBtn;
  };

  const hasCompleted = true;

  return (
    <footer className={ styles.footer }>
      <span className={ styles.itemCount }>3 items left</span>
      <div className={ styles.filters }>
        <button className={ filterButtonClass('all') } type={ 'button' }>All</button>
        <button className={ filterButtonClass('active') } type={ 'button' }>
          Active
        </button>
        <button className={ filterButtonClass('completed') } type={ 'button' }>
          Completed
        </button>
      </div>
      <div className={ styles.filters }>
        <button className={ `${ styles.clearCompleted } ${ hasCompleted ? '' : styles.hide }` }
                type={ 'button' }>
          Clear Completed
        </button>
      </div>
    </footer>
  );
};

export default Footer;
