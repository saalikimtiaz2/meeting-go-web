/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-autofocus */
import { MeetingButton } from 'components/Buttons';
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { loading, scheduleMeeting } = useScheduleMeeting();

  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState<boolean>(false);
  const [meetingsHistory, setMeetingsHistory] = useState<historyCardProps[]>([
    ...history,
    ...history,
  ]);

  const [showCreateRoomDialog, setShowCreateRoomDialog] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [duration, setDuration] = useState(15);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  const [showJoinMeetingModal, setShowJoinMeetingModal] = useState<boolean>(false);
  const [meetingLink, setMeetingLink] = useState<string>('');

  const toggleJoinMeetingModal = () => {
    setShowJoinMeetingModal((prevState) => !prevState);
  };

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
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, reprehenderit?"
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
              value={description}
              name="Enter your description here..."
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
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

      {/* -------------------------------------Join Meeting DIalog---------------------------------------------- */}
      <DialogBox
        isOpen={showJoinMeetingModal}
        closeDialog={toggleJoinMeetingModal}
        title="Join Meeting"
        description="Please paste the invitation link below to join the meeeting."
      >
        <label htmlFor="meeting-link" className="text-lg font-Oswald text-gray-500">
          Meeting Link
          <input
            name="meeting-link"
            className="font-Montserrat"
            placeholder="example"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
        </label>

        <div className="flex items-center justify-end gap-x-6">
          <button
            onClick={toggleJoinMeetingModal}
            className="w-32 py-2 rounded-md hover:bg-opacity-100 bg-opacity-70 bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              navigate(`/meeting?${meetingLink}}`);
            }}
            className="w-32 py-2 rounded-md hover:bg-opacity-100 bg-opacity-70 bg-green-500 text-white"
          >
            Join
          </button>
        </div>
      </DialogBox>

      <div className="pb-20">
        <Heading2 className="mb-4">Meetings</Heading2>

        <div className="grid grid-cols-12 gap-4">
          <MeetingButton
            className="bg-orange-500 text-white"
            icon={<CiVideoOn size={32} />}
            text="New Meeting"
            onClick={() => {
              console.log('new meeting clicked!');
            }}
          />
          <MeetingButton
            className="bg-blue-500 text-white"
            icon={<IoAddOutline size={32} />}
            text="Join Meeting"
            onClick={toggleJoinMeetingModal}
          />

          <MeetingButton
            className="bg-red-500 text-white"
            icon={<CiCalendar size={32} />}
            text="Schedule"
            onClick={toggleCreateRoomDialog}
          />
          <MeetingButton
            className="bg-green-500 text-white"
            icon={<SlScreenDesktop size={32} />}
            text="Share Screen"
            onClick={() => {}}
          />
        </div>

        <Heading2 className="my-8">Upcoming Meetings</Heading2>
        {upcomingMeetings.length > 0 ? (
          <div className="grid grid-cols-12 gap-4">
            {upcomingMeetings.map((meeting, idx) => (
              <div
                key={meeting.title + idx}
                className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3"
              >
                <MeetingCard
                  title={meeting.title}
                  time={meeting.time}
                  tags={meeting.tags}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-300 dark:border-gray-700 rounded-xl pb-10">
            <img
              src="infographics/no-meeting.svg"
              className="xs:h-[250px] lg:h-[250px] mx-auto dark:opacity-50"
              alt=""
            />
            <p className="text-xl text-center text-gray-500">No scheduled meeting!</p>
          </div>
        )}

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
          <div className="border border-gray-300 dark:border-gray-700 rounded-xl py-10 text-gray-500 mb-10">
            <img
              src="/infographics/no-data.svg"
              className="h-32 mb-2 opacity-50 mx-auto"
              alt="no data"
            />
            <p className="text-xl text-center">No history!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
