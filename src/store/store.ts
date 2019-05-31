import { applyMiddleware, compose, createStore, Middleware, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { TodoState } from './reducers/todos/todoReducer';

export type AppState = {
  todoState: TodoState;
};

const configureStore = (initialState?: AppState) => {
  const middlewares: Middleware[] = [];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  let composedEnhancers: StoreEnhancer = compose(...[middlewareEnhancer]);

  if (process.env.NODE_ENV === 'development') {
    composedEnhancers = composeWithDevTools(...[middlewareEnhancer]);
  }

  return createStore(rootReducer, initialState, composedEnhancers);
};

export default configureStore;
