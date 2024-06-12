import Layout from 'components/Layout';
import { Heading2 } from 'components/Typography/Heading';
import React from 'react';
import { CiCalendar, CiVideoOn } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';
import { SlScreenDesktop } from 'react-icons/sl';

function Meeting() {
  return (
    <Layout>
      <Heading2 className="mb-4">Meetings</Heading2>
      <div className="grid grid-cols-12 gap-4">
        <button className="relative overflow-hidden xs:col-span-6 md:col-span-3 rounded-lg p-6 bg-orange-500 text-white text-left text-xl">
          <div className="h-12 w-12 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <CiVideoOn size={32} />
          </div>
          <div className="absolute bottom-6 right-6 opacity-10 -rotate-45 scale-[4]">
            <CiVideoOn size={32} />
          </div>
          New Meeting
        </button>
        <button className="relative overflow-hidden xs:col-span-6 md:col-span-3 rounded-lg p-6 bg-blue-500 text-white text-left text-xl">
          <div className="h-12 w-12 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <IoAddOutline size={32} />
          </div>
          <div className="absolute bottom-6 right-6 opacity-10   scale-[4]">
            <IoAddOutline size={32} />
          </div>
          Join Meeitng
        </button>
        <button className="relative overflow-hidden xs:col-span-6 md:col-span-3 rounded-lg p-6 bg-red-500 text-white text-left text-xl">
          <div className="h-12 w-12 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <CiCalendar size={32} />
          </div>
          <div className="absolute bottom-6 right-6 opacity-10 rotate-45 scale-[4]">
            <CiCalendar size={32} />
          </div>
          Schedule
        </button>
        <button className="relative overflow-hidden xs:col-span-6 md:col-span-3 rounded-lg p-6 bg-green-500 text-white text-left text-xl">
          <div className="h-12 w-12 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <SlScreenDesktop size={32} />
          </div>
          <div className="absolute bottom-6 right-6 opacity-10 rotate-45 scale-[4]">
            <SlScreenDesktop size={32} />
          </div>
          Share Screen
        </button>
      </div>
    </Layout>
  );
}

export default Meeting;
