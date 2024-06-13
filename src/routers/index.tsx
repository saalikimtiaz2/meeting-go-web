import React, { lazy, Suspense } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* ---------------------------Auth Routes------------------------ */
const Login = lazy(() => import('pages/Auth/Login'));
const Signup = lazy(() => import('pages/Auth/Signup'));
/* ---------------------------Private Routes------------------------ */
const Dashboard = lazy(() => import('pages/Dashboard'));
const Meeting = lazy(() => import('pages/Metting'));
const Account = lazy(() => import('pages/Account'));
const Schedule = lazy(() => import('pages/Schedule'));
const Contacts = lazy(() => import('pages/Contacts'));
const Notifications = lazy(() => import('pages/Notifications'));
const Settings = lazy(() => import('pages/Settings'));
const Support = lazy(() => import('pages/Support'));
const Help = lazy(() => import('pages/Help'));

function Routers() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center tw-bg-primary">
            <TailSpin width={100} height={100} color="#fff" />
          </div>
        }
      >
        <Routes>
          {/* ----------Auth Routers---------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ----------Private Routers---------------- */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routers;
