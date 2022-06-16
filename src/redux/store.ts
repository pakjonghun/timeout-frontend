import { configureStore } from '@reduxjs/toolkit';
import record from './features/record';
import timer from './features/timer';
import api from './index';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    timer,
    record,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
