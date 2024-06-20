/* eslint-disable no-unused-vars */
import { DailyCall, DailyEvent, DailyParticipant } from '@daily-co/daily-js';
import Chat from 'dailyCo/Chat';
import Tile from 'dailyCo/Tile';
import Tray from 'dailyCo/Tray';
import React, { useEffect, useReducer, useState } from 'react';

interface CallProps {
  callObject: DailyCall | null;
  startLeavingCall: () => void;
}

interface UserData {
  avatar_url: string;
  name: string;
}

interface ParticipantTracks {
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  isLocal: boolean;
  isOwner: boolean;
  userName: string;
  userId: string;
  audioStatus: string;
  videoStatus: string;
  screenShareStatus: string;
  isSpotlited: boolean;
  username: string;
  avatarURL: string;
}

interface ParticipantState {
  [id: string]: ParticipantTracks;
}

const initialState: ParticipantState = {};

type Action = { type: 'PARTICIPANTS_CHANGE'; participants: ParticipantState };

const participantReducer = (
  state: ParticipantState,
  action: Action,
): ParticipantState => {
  switch (action.type) {
    case 'PARTICIPANTS_CHANGE':
      return action.participants;
    default:
      return state;
  }
};

const Call: React.FC<CallProps> = ({ callObject, startLeavingCall }) => {
  const [participants, dispatch] = useReducer(participantReducer, initialState);
  const [spotlightUser, setSpotlightUser] = useState('local');

  const [showChat, setShowChat] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState(false);

  const toggleChat = () => {
    setShowChat((prevState) => !prevState);
    if (newChatMessage) {
      setNewChatMessage(!newChatMessage);
    }
  };

  const toggleNewChat = (item: boolean) => {
    setNewChatMessage(item);
  };

  const changeSpotlightUser = (id: string) => {
    setSpotlightUser(id);
  };

  useEffect(() => {
    if (!callObject) return;

    const handleNewParticipantsState = () => {
      const participantsState: ParticipantState = {};
      const dailyParticipants = callObject.participants();

      console.log('dailyParti: ', dailyParticipants);

      for (const [id, participant] of Object.entries<DailyParticipant>(
        dailyParticipants,
      )) {
        const userData = participant.userData as UserData;
        participantsState[id] = {
          videoTrack: participant.tracks.video?.track || null,
          audioTrack: participant.tracks.audio?.track || null,
          username: participant.user_name,
          isLocal: participant.local,
          isOwner: participant.owner,
          userName: participant.user_name,
          userId: participant.user_id,
          audioStatus: participant.tracks.audio.state,
          videoStatus: participant.tracks.video.state,
          screenShareStatus: participant.tracks.screenVideo.state,
          isSpotlited: participant.user_id === spotlightUser,
          avatarURL: userData?.avatar_url,
        };
      }

      dispatch({ type: 'PARTICIPANTS_CHANGE', participants: participantsState });
    };

    const events: DailyEvent[] = [
      'participant-joined',
      'participant-updated',
      'participant-left',
    ];
    events.forEach((event) => callObject.on(event, handleNewParticipantsState));

    handleNewParticipantsState();

    return () => {
      events.forEach((event) => callObject.off(event, handleNewParticipantsState));
    };
  }, [callObject]);

  return (
    <>
      <div className="h-full grid grid-cols-12 gap-x-4 ">
        <div
          className={`${showChat ? 'col-span-9' : 'col-span-12'}  call h-full relative`}
        >
          {Object.entries(participants).map(([id, participant]) => {
            if (id === spotlightUser) {
              return (
                <Tile
                  key={id}
                  videoTrack={participant.videoTrack}
                  audioTrack={participant.audioTrack}
                  id={id}
                  isLocal={participant.isLocal}
                  isAlone={Object.entries(participants).length === 1}
                  isSpotlightTile={spotlightUser === id}
                  setSpotlightTile={changeSpotlightUser}
                  username={participant.username}
                />
              );
            }
          })}
          <div className="absolute top-1 right-1 bottom-1 flex xs:w-[130px] md:w-[240px] flex-col items-end">
            {Object.entries(participants).map(([id, participant]) => {
              if (id !== spotlightUser) {
                return (
                  <Tile
                    key={id}
                    videoTrack={participant.videoTrack}
                    audioTrack={participant.audioTrack}
                    id={id}
                    isLocal={participant.isLocal}
                    isAlone={Object.entries(participants).length === 1}
                    isSpotlightTile={spotlightUser === id}
                    setSpotlightTile={changeSpotlightUser}
                    username={participant.username}
                  />
                );
              }
            })}
          </div>
          <Tray
            leaveCall={startLeavingCall}
            toggleChat={toggleChat}
            showChat={showChat}
            newChatMessage={newChatMessage}
            setNewChatMessage={toggleNewChat}
          />
        </div>
        <div
          className={`${showChat ? 'col-span-3' : 'col-span-0 hidden'}  h-full relative`}
        >
          <Chat showChat={showChat} toggleChat={toggleChat} participants={participants} />
        </div>
      </div>
    </>
  );
};

export default Call;
