import store from '@redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routers from './routers';
import 'react-toastify/dist/ReactToastify.css';
import './styles/tailwind.css';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <Provider store={store}>
    <Routers />
    <ToastContainer />
  </Provider>,
);
