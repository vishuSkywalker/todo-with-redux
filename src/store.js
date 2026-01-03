import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxTodos');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxTodos', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: { todos: loadState() || [] },
});

store.subscribe(() => {
  saveState(store.getState().todos);
});