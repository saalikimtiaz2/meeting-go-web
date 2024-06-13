import DashboardLayout from 'components/DashboardLayout';
import AnimatedNotifications from 'components/Notifications';
import { Heading2 } from 'components/Typography/Heading';
import React from 'react';

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

function Notifications() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12">
        <div className="xs:col-span-12 md:col-span-2 lg:cols-span-3" />
        <div className="xs:col-span-12 md:col-span-8 lg:cols-span-6">
          <Heading2 className="mb-10 mt-4">Notifications</Heading2>
          <AnimatedNotifications notifications={notifications} repeat={4} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Notifications;
