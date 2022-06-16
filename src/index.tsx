import store from '@redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routers from './routers';
import './styles/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
    ,
  </React.StrictMode>,
);
