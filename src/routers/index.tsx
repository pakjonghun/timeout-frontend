import React from 'react';
import Test from '@components/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@pages/Login';
import Join from '@pages/Join';
import Record from '@pages/Record';
import Timer from '@pages/Timer';
import Admin from '@pages/Admin';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/timers" element={<Timer />} />
        <Route path="/records" element={<Record />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
