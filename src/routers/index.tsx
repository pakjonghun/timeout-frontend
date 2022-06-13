import React from 'react';
import Test from '@components/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
