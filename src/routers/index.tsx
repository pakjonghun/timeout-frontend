import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Spinner from '@components/Spinner';
import { useGetMyInfoQuery } from '@redux/services/userApi';

const Login = React.lazy(() => import('@pages/Login'));
const Join = React.lazy(() => import('@pages/Join'));
const Record = React.lazy(() => import('@pages/Record'));
const Timer = React.lazy(() => import('@pages/Timer'));
const Admin = React.lazy(() => import('@pages/Admin'));
const Profile = React.lazy(() => import('@pages/Profile'));
const ErrorFallback = React.lazy(() => import('@components/ErrorFallback'));

const Routers = () => {
  const { data } = useGetMyInfoQuery();
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <Spinner classes="h-5 w-5" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/search" element={<Record />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/avatar" element={<Profile />} />
            <Route path="/record" element={<Record />} />
            {data?.data.role === 'Manager' && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routers;
