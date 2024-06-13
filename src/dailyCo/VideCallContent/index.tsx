/* eslint-disable no-unused-vars */
import DailyIframe, { DailyCall, DailyEvent, DailyEventObject } from '@daily-co/daily-js';
import Call from 'dailyCo/Call'; // Adjust the import path as necessary
import Tray from 'dailyCo/Tray'; // Adjust the import path as necessary
import React, { useCallback, useEffect, useState } from 'react';

const App: React.FC = () => {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [meetingState, setMeetingState] = useState<string>('new');
  const [roomUrl, setRoomUrl] = useState<string>('');

  useEffect(() => {
    if (!callObject) return;

    const handleNewMeetingState = (event: DailyEventObject) => {
      console.log('Meeting state change:', event);
      switch (callObject.meetingState()) {
        case 'joined-meeting':
          setMeetingState('joined');
          break;
        case 'left-meeting':
          callObject.destroy().then(() => setMeetingState('left'));
          break;
        case 'error':
          setMeetingState('error');
          break;
        default:
          break;
      }
    };

    const events: DailyEvent[] = ['joined-meeting', 'left-meeting', 'error'];
    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  const createCall = useCallback(() => {
    setMeetingState('creating');
    fetch('/api/create-room')
      .then((response) => response.json())
      .then((data) => {
        setRoomUrl(data.url);
        const newCallObject = DailyIframe.createCallObject();
        setCallObject(newCallObject);
        newCallObject.join({ url: data.url });
      })
      .catch((error) => {
        setMeetingState('error');
        console.log(error);
      });
  }, []);

  const leaveCall = useCallback(() => {
    if (callObject) {
      callObject.leave();
      setCallObject(null);
    }
  }, [callObject]);

  if (meetingState === 'new' || meetingState === 'left') {
    return (
      <div>
        <button onClick={createCall}>Start Call</button>
      </div>
    );
  }

  if (meetingState === 'joining' || meetingState === 'creating') {
    return <div>Joining the call...</div>;
  }

  if (meetingState === 'joined') {
    return (
      <div>
        <Call callObject={callObject} />
        <Tray leaveCall={leaveCall} />
        <button onClick={leaveCall}>Leave Call</button>
      </div>
    );
  }

  return <div>Error occurred. Please try again.</div>;
};

export default App;
