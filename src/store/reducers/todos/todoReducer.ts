import { Reducer } from 'redux';
import { action, ActionType } from 'typesafe-actions';

export type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

export type TodoState = {
  readonly todos: Todo[];
  readonly filter: FilterType
};

const initialState = {
  todos: [],
  filter: 'all'
} as TodoState;

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const SET_FILTER = 'SET_FILTER';

export const todoActions = {
  addTodo: (content: string) => action(ADD_TODO, { content }),
  updateTodo: (id: number, content: string) => action(UPDATE_TODO, { id, content }),
  deleteTodo: (id: number) => action(DELETE_TODO, { id }),
  toggleTodo: (id: number) => action(TOGGLE_TODO, { id }),
  toggleAll: (completing: boolean) => action(TOGGLE_ALL, { completing }),
  clearCompleted: () => action(CLEAR_COMPLETED),
  setFilter: (type: FilterType) => action(SET_FILTER, { type })
};

export type TodoActions = ActionType<typeof todoActions>;

export const todoReducer: Reducer<TodoState, TodoActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TODO': {
      const { content, id } = action.payload;
      const updatedTodos = state.todos.map(todo => todo.id === id ? { ...todo, content } : { ...todo });
      return { ...state, todos: updatedTodos };
    }
    case 'TOGGLE_ALL': {
      return { ...state, todos: state.todos.map(todo => ({ ...todo, isCompleted: action.payload.completing })) };
    }
    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo })
      };
    }
    case 'DELETE_TODO': {
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) };
    }
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        isCompleted: false,
        content: action.payload.content
      };
      return { ...state, todos: [...state.todos, newTodo] };
    }
    case 'CLEAR_COMPLETED': {
      return { ...state, todos: state.todos.filter(todo => !todo.isCompleted) };
    }
    case 'SET_FILTER': {
      return { ...state, filter: action.payload.type };
    }
    default:
      return state;
  }
};
