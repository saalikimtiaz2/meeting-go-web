/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import 'styles/video.scss';

import Username from 'dailyCo/Username';
import React, { FC } from 'react';

interface TileProps {
  id: string;
  isScreenShare?: boolean;
  isLocal?: boolean;
  isAlone?: boolean;
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
}

const Tile: FC<TileProps> = ({
  id,
  isScreenShare,
  isLocal = false,
  isAlone,
  videoTrack,
  audioTrack,
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
    <div className={containerCssClasses}>
      {/* Render video and audio tracks */}
      {videoTrack && (
        <video
          autoPlay
          playsInline
          ref={(video) => video && (video.srcObject = new MediaStream([videoTrack]))}
        />
      )}
      {audioTrack && (
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
