import 'styles/video.scss';

import { useParticipantProperty } from '@daily-co/daily-react';
import React from 'react';

export default function Username({ id, isLocal }: { id: string; isLocal: boolean }) {
  const username = useParticipantProperty(id, 'user_name');

  return (
    <div className="username">
      {username || id} {isLocal && '(you)'}
    </div>
  );
}
