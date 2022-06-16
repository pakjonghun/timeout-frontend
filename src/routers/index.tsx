import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@pages/Login';
import Join from '@pages/Join';
import Record from '@pages/Record';
import Timer from '@pages/Timer';
import Admin from '@pages/Admin';
import Search from '@pages/Search';
import Profile from '@pages/Profile';

const Routers = () => {
  const isAdmin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/avatar" element={<Profile />} />
        <Route path="/record" element={<Record />} />
        {isAdmin && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
