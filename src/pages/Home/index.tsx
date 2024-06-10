import Calender from 'components/Calender';
import Layout from 'components/Layout';
import GradualSpacing from 'components/MagicUI/GradualSpacing';
import NumberTicker from 'components/MagicUI/NumberTicker';
import AnimatedNotifications from 'components/Notifications';
import React from 'react';
import { LuCalendarOff } from 'react-icons/lu';
import { MdOutlineCalendarToday, MdPendingActions } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';

let notifications = [
  {
    name: 'New Meeting Scheduled',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, eos.',
    time: '15m ago',
    icon: '💸',
    color: '#00C9A7',
  },
  {
    name: 'New Meeting Request',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, eos.',
    time: '10m ago',
    icon: '👤',
    color: '#FFB800',
  },
  {
    name: 'Meeting Canceled',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, eos.',
    time: '5m ago',
    icon: '💬',
    color: '#FF3D71',
  },
];

function HomePage() {
  const activites = [
    {
      title: 'Schedule meetings',
      total: 45,
      icon: <PiUsersThree size={30} />,
      bg: 'bg-green-500',
    },
    {
      title: 'Rescheduled meetings',
      total: 64,
      icon: <MdOutlineCalendarToday size={30} />,
      bg: 'bg-yellow-400',
    },
    {
      title: 'Pending meetings',
      total: 15,
      icon: <MdPendingActions size={30} />,
      bg: 'bg-blue-500',
    },
    {
      title: 'Canceled meetings',
      total: 85,
      icon: <LuCalendarOff size={30} />,
      bg: 'bg-red-600',
    },
  ];

  return (
    <Layout>
      <div>
        <GradualSpacing
          className="tracking-[-0.1em] text-black dark:text-gray-200 text-4xl font-medium text-left"
          text="Welcome back Salik!"
        />
        <div className="cover  rounded-xl text-white  h-[250px] relative overflow-hidden drop-shadow-xl mt-4">
          <div className="absolute px-8 top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-black to-transparent flex flex-col justify-center">
            <p className="text-white text-[94px] leading-none font-Oswald">
              7:19 <span className="inline-block text-xl">PM</span>
            </p>
            <p className="">Satureday 10 May, 2024</p>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-10 gap-6">
          <div className="xs:col-span-12 md:col-span-6 lg:col-span-4 grid grid-cols-12 gap-6">
            {activites.map((item) => (
              <div
                key={item.title}
                className={`${item.bg} col-span-6 rounded-lg px-4 py-8 shadow-lg relative overflow-hidden`}
              >
                <div className="text-white text-xl flex items-center gap-x-4 font-Oswald whitespace-nowrap">
                  {item.icon}
                  {item.title}
                </div>
                <p className="text-center mt-4 text-5xl font-semibold text-white font-Montserrat">
                  <NumberTicker value={item.total} />
                </p>
                <div className="absolute bottom-6 left-6 opacity-10 scale-[3.5] text-white">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
          <div className="xs:col-span-12 md:col-span-6 xl:col-span-3 ">
            <h3 className="text-gray-300 dark:text-gray-700 text-xl font-Oswald mb-3">
              Calender
            </h3>
            <Calender />
          </div>
          <div className="xs:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-5">
            <h3 className="text-gray-300 dark:text-gray-700 text-xl font-Oswald mb-3">
              Notifications
            </h3>
            <AnimatedNotifications notifications={notifications} repeat={1} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
