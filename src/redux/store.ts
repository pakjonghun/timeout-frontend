import { addListener, combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './features/user';
import timer from './features/timer';
import api from './services/index';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  timer,
  user,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
