import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './routers';
import './styles/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
);
