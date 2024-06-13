import 'styles/video.scss';

import {
  useMeetingState,
  useNetwork,
  useParticipantIds,
  useRoom,
} from '@daily-co/daily-react';
import React from 'react';

export default function MeetingInformation() {
  const room = useRoom();
  const network = useNetwork();
  const allParticipants = useParticipantIds();
  const meetingState = useMeetingState();

  return (
    <section className="bg-white/50 text-white p-4 rounded-lg shadow-xl">
      <h1>Meeting information</h1>
      <ul>
        <li>Meeting state: {meetingState ?? 'unknown'}</li>
        <li>Meeting ID: {room?.id ?? 'unknown'}</li>
        <li>Room name: {room?.name ?? 'unknown'}</li>
        <li>Network status: {network?.threshold ?? 'unknown'}</li>
        <li>Network topology: {network?.topology ?? 'unknown'}</li>
        <li>Participant IDs: {allParticipants.join(', ')}</li>
      </ul>
    </section>
  );
}
