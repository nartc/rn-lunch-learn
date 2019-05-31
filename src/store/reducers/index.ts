import { combineReducers } from 'redux';
import { todoReducer } from './todos/todoReducer';

export default combineReducers({
  todoState: todoReducer
});
