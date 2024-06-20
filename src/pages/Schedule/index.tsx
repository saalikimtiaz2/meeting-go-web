/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
import HistoryCard from 'components/Cards/HistoryCard';
import MeetingCard from 'components/Cards/MeetingCard';
import DashboardLayout from 'components/DashboardLayout';
import DialogBox from 'components/HeadlessUI/DialogBox';
import ReactMultiInputEmail from 'components/ReactMultiInputEmail';
import { Heading2 } from 'components/Typography/Heading';
// import { useAuth } from 'context/AuthContext';
import useScheduleMeeting from 'hooks/Meeting/useScheduleMeeing';
import React, { FC, useState } from 'react';
import { CiCalendar, CiVideoOn } from 'react-icons/ci';
import { IoAddOutline } from 'react-icons/io5';
import { SlScreenDesktop } from 'react-icons/sl';
import { TailSpin } from 'react-loader-spinner';

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

const Schedule: FC = () => {
  // const { user } = useAuth();
  const { loading, scheduleMeeting } = useScheduleMeeting();

  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState<boolean>(false);
  const [meetingsHistory, setMeetingsHistory] = useState<historyCardProps[]>([
    ...history,
    ...history,
  ]);

  const [showCreateRoomDialog, setShowCreateRoomDialog] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [dateTime, setDateTime] = useState('');
  const [duration, setDuration] = useState(15);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  const toggleCreateRoomDialog = () => {
    setShowCreateRoomDialog((prevState) => !prevState);
  };

  const toggleClearHistoryModal = () => {
    setShowClearHistoryDialog((prevState) => !prevState);
  };

  const clearMeetingHistory = () => {
    setMeetingsHistory([]);
    toggleClearHistoryModal();
  };

  const handleScheduleMeeting = (e: any) => {
    e.preventDefault();
    scheduleMeeting({
      roomName,
      dateTime,
      duration,
      email: invitedUsers,
    });
  };

  return (
    <DashboardLayout>
      {/* -------------------------------------Clear History DIalog---------------------------------------------- */}

      <DialogBox
        isOpen={showCreateRoomDialog}
        closeDialog={toggleCreateRoomDialog}
        title="Scedule New Meeting"
        discription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, reprehenderit?"
      >
        <form className="mt-6">
          <label htmlFor="name" className="text-lg font-Oswald text-gray-500">
            Meeting Title
            <input
              type="name"
              placeholder="Sprint Planning, Daily Meeting, etc."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </label>
          <label htmlFor="description" className="text-lg font-Oswald text-gray-500">
            Dscription
            <textarea
              placeholder="Sprint Planning, Daily Meeting, etc."
              value={roomName}
              name="Enter your description here..."
              rows={2}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </label>
          <label
            htmlFor="dateTime"
            className="block text-lg font-Oswald text-gray-500 mb-2"
          >
            Date and Time
            <input
              id="dateTime"
              className=""
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
            {/* <Calendar
              id="dateTime"
              onChange={setDateTime}
              value={dateTime}
              minDate={new Date()}
              className="border-2 bg-black/5 dark:bg-white/20 border-gray-200 dark:border-gray-700 w-full py-2.5 font-Montserrat text-black dark:text-gray-200 outline-none text-base rounded-xl px-4 mb-2 focus:border-primary dark:focus:border-primary transition-all ease-in-out duration-300"
            /> */}
          </label>
          <label
            htmlFor="invitedUsers"
            className="block text-lg font-Oswald text-gray-500 mb-2"
          >
            Duration
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
              <option value={60}>60</option>
            </select>
          </label>
          <label
            htmlFor="invitedUsers"
            className="block text-lg font-Oswald text-gray-500 mb-2"
          >
            Add Guests
            <ReactMultiInputEmail
              emails={invitedUsers}
              setEmails={(e) => setInvitedUsers(e)}
            />
          </label>
          <div className="flex justify-end items-center gap-x-4">
            <button
              type="button"
              onClick={toggleCreateRoomDialog}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-black text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-400 hover:bg-green-600 text-white"
              onClick={(e) => handleScheduleMeeting(e)}
            >
              {loading ? <TailSpin width={20} color="white" /> : 'Schedule'}
            </button>
          </div>
        </form>
      </DialogBox>

      {/* -------------------------------------Clear History DIalog---------------------------------------------- */}
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
        <button
          onClick={toggleCreateRoomDialog}
          className="relative overflow-hidden xs:col-span-6 md:col-span-3 rounded-lg p-6 bg-red-500 text-white text-left text-xl"
        >
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

export default Schedule;
