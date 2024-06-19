import 'styles/video.scss';

import { useParticipantProperty } from '@daily-co/daily-react';
import React from 'react';

export default function Username({ id, isLocal }: { id: string; isLocal: boolean }) {
  const username = useParticipantProperty(id, 'user_name');

  return (
    <div className="absolute bottom-2 left-2 px-4 py-1 bg-black/30 rounded-lg backdrop-blur-sm text-white text-sm">
      {username || id} {isLocal && '(you)'}
    </div>
  );
}
