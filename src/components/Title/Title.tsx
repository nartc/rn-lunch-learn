import { styled } from '@material-ui/styles';
import React from 'react';

const StyledTitle = styled('h1')({
  color: 'rgba(175, 47, 47, 0.15)',
  fontWeight: 100,
  fontSize: '8em',
  width: '100%',
  margin: '0.5em auto',
  textAlign: 'center'
});

const Title: React.FC = () => {
  return (
    <StyledTitle>todos</StyledTitle>
  );
};

export default Title;
