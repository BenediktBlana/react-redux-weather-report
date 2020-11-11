import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import filterReducer from '../features/filter/filterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    filter: filterReducer,
  },
});
