import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from '../features/sessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionSlice,
  },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
