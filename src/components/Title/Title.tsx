import React from 'react';
import styles from './Title.module.scss';

const Title: React.FC = () => {
  return (
    <h1 className={ styles.title }>todos</h1>
  );
};

export default Title;
