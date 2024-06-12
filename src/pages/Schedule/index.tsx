import HistoryCard from 'components/Cards/HistoryCard';
import MeetingCard from 'components/Cards/MeetingCard';
import Layout from 'components/Layout';
import { Heading2 } from 'components/Typography/Heading';
import React, { FC } from 'react';

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
    time: 'Nov 11, 11:30am - 01:20pm',
    tags: ['Meeting', 'Daily'],
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
  {
    title: 'Agenda Review',
    time: 'Nov 15, 11:30am - 01:20pm',
    tags: ['Meeting', 'Daily'],
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
  return (
    <Layout>
      <Heading2 className="mb-10">Upcoming Meetings</Heading2>
      <div className="grid grid-cols-12 xs:gap-4 lg:gap-4">
        {[...upcomingMeetings, ...upcomingMeetings].map((meeting, idx) => (
          <div
            key={meeting.title + idx}
            className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
          >
            <MeetingCard title={meeting.title} time={meeting.time} tags={meeting.tags} />
          </div>
        ))}
      </div>

      <Heading2 className="mt-20 mb-10">History</Heading2>
      <div className="grid grid-cols-12 xs:gap-4 lg:gap-4">
        {[...history, ...history].reverse().map((meeting, idx) => (
          <div key={meeting.title + idx} className="xs:col-span-12 md:col-span-6">
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
    </Layout>
  );
};

export default MeetingList;
