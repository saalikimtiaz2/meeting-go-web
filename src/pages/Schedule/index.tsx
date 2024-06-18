import HistoryCard from 'components/Cards/HistoryCard';
import MeetingCard from 'components/Cards/MeetingCard';
import DashboardLayout from 'components/DashboardLayout';
import DialogBox from 'components/HeadlessUI/DialogBox';
import { Heading2 } from 'components/Typography/Heading';
import React, { FC, useState } from 'react';
import { CiCalendar, CiVideoOn } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';
import { SlScreenDesktop } from 'react-icons/sl';

type meetingCardProps = {
  title: string;
  time: string;
  tags: string[];
};

type historyCardProps = {
  title: string;
  time: string;
  day: number;
  month: string;
  tags: string[];
};

const upcomingMeetings: meetingCardProps[] = [
  {
    title: 'Design Sprint',
    time: 'Nov 10, 11:30am - 01:20pm',
    tags: ['Meeting', 'Design'],
  },
  {
    title: 'Daily Meeting',
    time: 'Nov 12, 11:30am - 01:20pm',
    tags: ['Meeting', 'Daily'],
  },
  {
    title: 'Project Status',
    time: 'Nov 13, 11:30am - 01:20pm',
    tags: ['Meeting', 'Project'],
  },
  {
    title: 'Design Goals',
    time: 'Nov 14, 11:30am - 01:20pm',
    tags: ['Meeting', 'Design'],
  },
];

const history: historyCardProps[] = [
  {
    title: 'Design Sprint',
    time: '11:30am - 01:20pm',
    day: 12,
    month: 'Sep',
    tags: ['Meeting', 'Design'],
  },
  {
    title: 'Daily Meeting',
    time: '11:30am - 01:20pm',
    day: 15,
    month: 'Sep',
    tags: ['Meeting', 'Daily'],
  },
  {
    title: 'Daily Meeting',
    time: '11:30am - 01:20pm',
    day: 22,
    month: 'Sep',
    tags: ['Meeting', 'Daily'],
  },
  {
    title: 'Project Status',
    time: '11:30am - 01:20pm',
    day: 30,
    month: 'Sep',
    tags: ['Meeting', 'Project'],
  },
  {
    title: 'Design Goals',
    time: '11:30am - 01:20pm',
    day: 8,
    month: 'Nov',
    tags: ['Meeting', 'Design'],
  },
  {
    title: 'Agenda Review',
    time: '11:30am - 01:20pm',
    day: 12,
    month: 'Nov',
    tags: ['Meeting', 'Daily'],
  },
];

const MeetingList: FC = () => {
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState<boolean>(false);
  const [meetingsHistory, setMeetingsHistory] = useState<historyCardProps[]>([
    ...history,
    ...history,
  ]);

  const toggleClearHistoryModal = () => {
    setShowClearHistoryDialog((prevState) => !prevState);
  };

  const clearMeetingHistory = () => {
    setMeetingsHistory([]);
    toggleClearHistoryModal();
  };

  return (
    <DashboardLayout>
      <DialogBox isOpen={showClearHistoryDialog} closeDialog={toggleClearHistoryModal}>
        <h2 className="text-2xl text-red-500 font-semibold">Logout?</h2>
        Are you sure you want to logout?
        <div className="flex items-center justify-end gap-x-6">
          <button
            onClick={toggleClearHistoryModal}
            className="w-32 py-2 rounded-md hover:bg-opacity-100 bg-opacity-70 bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={clearMeetingHistory}
            className="w-32 py-2 rounded-md hover:bg-opacity-100 bg-opacity-70 bg-red-500 text-white"
          >
            Clear History
          </button>
        </div>
      </DialogBox>

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

      <Heading2 className="my-8">Upcoming Meetings</Heading2>
      <div className="grid grid-cols-12 gap-4">
        {upcomingMeetings.map((meeting, idx) => (
          <div
            key={meeting.title + idx}
            className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3"
          >
            <MeetingCard title={meeting.title} time={meeting.time} tags={meeting.tags} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between my-8">
        <Heading2>History</Heading2>
        {meetingsHistory.length > 0 && (
          <button
            onClick={toggleClearHistoryModal}
            className="text-primary hover:text-accent text-sm"
          >
            Clear History
          </button>
        )}
      </div>

      {meetingsHistory.length > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          {meetingsHistory.reverse().map((meeting, idx) => (
            <div
              key={meeting.title + idx}
              className="xs:col-span-12 md:col-span-6 xl:col-span-4"
            >
              <HistoryCard
                title={meeting.title}
                time={meeting.time}
                tags={meeting.tags}
                day={meeting.day}
                month={meeting.month}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col text-gray-500">
          <img
            src="/infographics/no-data.svg"
            className="h-32 mb-2 opacity-50"
            alt="no data"
          />
          <p className="text-xl">No history!</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MeetingList;
