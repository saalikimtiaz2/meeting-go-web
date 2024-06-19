/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import 'styles/video.scss';

import Username from 'dailyCo/Username';
import React, { FC } from 'react';
import { PiResizeThin } from 'react-icons/pi';

interface TileProps {
  id: string;
  isScreenShare?: boolean;
  isLocal?: boolean;
  isAlone?: boolean;
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  isSpotlightTile?: boolean;
  setSpotlightTile: (userId: string) => void;
}

const Tile: FC<TileProps> = ({
  id,
  isScreenShare,
  isLocal = false,
  isAlone,
  videoTrack,
  audioTrack,
  isSpotlightTile = false,
  setSpotlightTile,
}) => {
  // const videoState = useVideoTrack(id);

  let containerCssClasses = isScreenShare ? 'tile-screenshare' : 'tile-video';

  if (isLocal) {
    containerCssClasses += ' self-view';
    if (isAlone) {
      containerCssClasses += ' alone';
    }
  }

  /* If a participant's video is muted, hide their video and
  add a different background color to their tile. */
  // if (videoState.isOff) {
  //   containerCssClasses += ' no-video';
  // }

  return (
    <div
      className={`${containerCssClasses} ${
        isSpotlightTile ? ' spotlight-tile' : ' small-tile mb-4'
      }`}
    >
      {!isSpotlightTile && (
        <div className="bg-black/50 flex items-center justify-center p-2 rounded-full absolute top-4 right-4 z-50">
          <button className="text-white" onClick={() => setSpotlightTile(id)}>
            <PiResizeThin size={26} />
          </button>
        </div>
      )}
      {videoTrack && (
        <video
          autoPlay
          playsInline
          ref={(video) => video && (video.srcObject = new MediaStream([videoTrack]))}
          className={`${isLocal && 'scale-x-[-1]'}`}
        />
      )}
      {audioTrack && !isLocal && (
        <audio
          autoPlay
          playsInline
          ref={(audio) => audio && (audio.srcObject = new MediaStream([audioTrack]))}
        />
      )}
      {/* Additional rendering logic for isScreenShare, isLocal, and isAlone */}
      {/* <DailyVideo
        automirror
        sessionId={id}
        type={isScreenShare ? 'screenVideo' : 'video'}
      /> */}
      {!isScreenShare && <Username id={id} isLocal={isLocal} />}
    </div>
  );
};

export default Tile;
