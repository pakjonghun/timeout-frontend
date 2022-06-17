import store from '@redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routers from './routers';
import 'react-toastify/dist/ReactToastify.css';
import './styles/tailwind.css';
import { ToastContainer } from 'react-toastify';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

const persistor = persistStore(store);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routers />
      <ToastContainer />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
