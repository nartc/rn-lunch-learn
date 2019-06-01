import { createContext, useContext } from 'react';
import { FilterType, Todo } from '../store/reducers/todos/todoReducer';

export type TodoContextState = {
  todos: Todo[];
  filter: FilterType;
};

export type TodoContextActions = {
  addTodo: (content: string) => void;
  updateTodo: (id: number, content: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: (completing: boolean) => void;
  clearCompleted: () => void;
  setFilter: (type: FilterType) => void;
};

export type TodoContext = {
  state: TodoContextState;
  actions: TodoContextActions;
}

const todoContext = createContext<TodoContext | null>(null);

export const useTodoContext = () => useContext(todoContext) as TodoContext;

export const TodoProvider = todoContext.Provider;
export const TodoConsumer = todoContext.Consumer;

/**
 *
 * addTodo: (content: string) => action(ADD_TODO, { content }),
 updateTodo: (id: number, content: string) => action(UPDATE_TODO, { id, content }),
 deleteTodo: (id: number) => action(DELETE_TODO, { id }),
 toggleTodo: (id: number) => action(TOGGLE_TODO, { id }),
 toggleAll: (completing: boolean) => action(TOGGLE_ALL, { completing }),
 clearCompleted: () => action(CLEAR_COMPLETED),
 setFilter: (type: FilterType) => action(SET_FILTER, { type })
 */
