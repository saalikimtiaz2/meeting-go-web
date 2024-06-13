/* eslint-disable no-unused-vars */
import { DailyCall, DailyEvent, DailyParticipant } from '@daily-co/daily-js';
import Tile from 'dailyCo/Tile';
import React, { useEffect, useReducer } from 'react';

interface CallProps {
  callObject: DailyCall | null;
}

interface ParticipantTracks {
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
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

const Call: React.FC<CallProps> = ({ callObject }) => {
  const [participants, dispatch] = useReducer(participantReducer, initialState);

  useEffect(() => {
    if (!callObject) return;

    const handleNewParticipantsState = () => {
      const participantsState: ParticipantState = {};
      const dailyParticipants = callObject.participants();

      for (const [id, participant] of Object.entries<DailyParticipant>(
        dailyParticipants,
      )) {
        participantsState[id] = {
          videoTrack: participant.tracks.video?.track || null,
          audioTrack: participant.tracks.audio?.track || null,
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

  useEffect(() => {
    console.log(participants);
  }, []);

  return (
    <div className="call">
      {Object.entries(participants).map(([id, participant]) => (
        <Tile
          key={id}
          videoTrack={participant.videoTrack}
          audioTrack={participant.audioTrack}
          id={id}
        />
      ))}
    </div>
  );
};

export default Call;
