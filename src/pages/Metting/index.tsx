import DailyIframe, { DailyCall, DailyEvent } from '@daily-co/daily-js';
import { DailyAudio, DailyProvider } from '@daily-co/daily-react';
import api from 'api/dailyAPI';
import DashboardLayout from 'components/DashboardLayout';
import Call from 'dailyCo/Call';
import HairCheck from 'dailyCo/HairCheck';
import HomeScreen from 'dailyCo/HomeScreen';
import Tray from 'dailyCo/Tray';
import { pageUrlFromRoomUrl, roomUrlFromPageUrl } from 'lib/utils';
import React, { useCallback, useEffect, useState } from 'react';

// App states
const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';
const STATE_HAIRCHECK = 'STATE_HAIRCHECK';

function Meeting() {
  const [appState, setAppState] = useState<string>(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [apiError, setApiError] = useState<boolean>(false);

  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom()
      .then((room) => {
        const url = room.url;
        setRoomUrl(url);
        return url;
      })
      .catch((error) => {
        console.error('Error creating room', error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
        setApiError(true);
      });
  }, []);

  const startHairCheck = useCallback(async (url: string) => {
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_HAIRCHECK);
    await newCallObject.preAuth({ url });
    await newCallObject.startCamera();
  }, []);

  const joinCall = useCallback(
    (userName: string) => {
      if (callObject && roomUrl) {
        callObject.join({ url: roomUrl, userName });
      }
    },
    [callObject, roomUrl],
  );

  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    if (appState === STATE_ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      setAppState(STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, appState]);

  useEffect(() => {
    const url = roomUrlFromPageUrl();
    if (url) {
      startHairCheck(url);
    }
  }, [startHairCheck]);

  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl || '');
    if (pageUrl !== window.location.href) {
      window.history.replaceState(null, '', pageUrl);
    }
  }, [roomUrl]);

  useEffect(() => {
    if (!callObject) return;

    // Define the events array with proper typing
    const events: DailyEvent[] = [
      'joined-meeting',
      'left-meeting',
      'error',
      'camera-error',
    ];

    const handleNewMeetingState = () => {
      switch (callObject?.meetingState()) {
        case 'joined-meeting':
          setAppState(STATE_JOINED);
          break;
        case 'left-meeting':
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case 'error':
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    };

    handleNewMeetingState();

    // Register event listeners
    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    // Cleanup event listeners
    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  const showCall =
    !apiError && [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);
  const showHairCheck = !apiError && appState === STATE_HAIRCHECK;

  const renderApp = () => {
    if (apiError) {
      return (
        <div className="api-error">
          <h1>Error</h1>
          <p>
            Room could not be created. Check if your `.env` file is set up correctly. For
            more information, see the{' '}
            <a href="https://github.com/daily-demos/custom-video-daily-react-hooks#readme">
              readme
            </a>{' '}
            :)
          </p>
        </div>
      );
    }

    if (showHairCheck || showCall) {
      return (
        <DailyProvider callObject={callObject}>
          {showHairCheck ? (
            <HairCheck joinCall={joinCall} cancelCall={startLeavingCall} />
          ) : (
            <>
              <Call callObject={callObject} />
              <Tray leaveCall={startLeavingCall} />
              <DailyAudio />
            </>
          )}
        </DailyProvider>
      );
    }

    return <HomeScreen createCall={createCall} startHairCheck={startHairCheck} />;
  };

  return <DashboardLayout disableNav>{renderApp()}</DashboardLayout>;
}

export default Meeting;
