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

interface ParticipantTracks {
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  isLocal: boolean;
  isOwner: boolean;
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
        participantsState[id] = {
          videoTrack: participant.tracks.video?.track || null,
          audioTrack: participant.tracks.audio?.track || null,
          isLocal: participant.local,
          isOwner: participant.owner,
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
                />
              );
            }
          })}
          <div className="absolute top-0 right-0 h-full flex">
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
                  />
                );
              }
            })}
          </div>
        </div>
        <div className={`${showChat ? 'col-span-3' : 'col-span-0'}  h-full relative`}>
          <Chat showChat={showChat} toggleChat={toggleChat} />
        </div>
      </div>
      <Tray
        leaveCall={startLeavingCall}
        toggleChat={toggleChat}
        showChat={showChat}
        newChatMessage={newChatMessage}
        setNewChatMessage={toggleNewChat}
      />
    </>
  );
};

export default Call;
