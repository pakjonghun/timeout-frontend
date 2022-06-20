import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@pages/Login';
import Join from '@pages/Join';
import Record from '@pages/Record';
import Timer from '@pages/Timer';
import Admin from '@pages/Admin';
import Profile from '@pages/Profile';
import ErrorFallback from '@components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

const Routers = () => {
  const isAdmin = true;
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/search" element={<Record />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/avatar" element={<Profile />} />
          <Route path="/record" element={<Record />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routers;
