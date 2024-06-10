import React, { lazy, Suspense } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Meeting = lazy(() => import('pages/Metting'));
const Notifications = lazy(() => import('pages/Notifications'));
const Settings = lazy(() => import('pages/Settings'));

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
          {/* ----------Main---------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/schedule" element={<Meeting />} />
          <Route path="/contacts" element={<Meeting />} />
          {/* ----------Others---------------- */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Meeting />} />
          <Route path="/help" element={<Meeting />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routers;
