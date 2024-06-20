import 'styles/video.scss';

import React from 'react';

export default function Username({
  id,
  isLocal,
  userName = 'Guest',
}: {
  id: string;
  isLocal: boolean;
  userName: string;
}) {
  return (
    <div className="absolute bottom-2 left-2 px-4 py-1 bg-black/30 rounded-lg backdrop-blur-sm text-white text-sm">
      {userName || id} {isLocal && '(you)'}
    </div>
  );
}
