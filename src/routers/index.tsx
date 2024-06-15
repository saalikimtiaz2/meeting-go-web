import Loader from 'components/Loader';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRouter from 'routers/middleware/PrivateRouter';

const Home = lazy(() => import('pages/Home'));
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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ----------Auth Routers---------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ----------Private Routers---------------- */}
          <Route path="/dashboard" element={<PrivateRouter />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/meeting" element={<PrivateRouter />}>
            <Route path="/meeting" element={<Meeting />} />
          </Route>
          <Route path="/account" element={<PrivateRouter />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/contacts" element={<PrivateRouter />}>
            <Route path="/contacts" element={<Contacts />} />
          </Route>
          <Route path="/schedule" element={<PrivateRouter />}>
            <Route path="/schedule" element={<Schedule />} />
          </Route>
          <Route path="/notifications" element={<PrivateRouter />}>
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          <Route path="/settings" element={<PrivateRouter />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/support" element={<PrivateRouter />}>
            <Route path="/support" element={<Support />} />
          </Route>
          <Route path="/help" element={<PrivateRouter />}>
            <Route path="/help" element={<Help />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routers;
