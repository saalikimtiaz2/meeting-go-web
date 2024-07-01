/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import 'styles/video.scss';

import PlaceholderTile from 'dailyCo/PlaceholderTile';
import Username from 'dailyCo/Username';
import React, { FC, useEffect, useRef, useState } from 'react';
import { PiResizeThin } from 'react-icons/pi';
import { Bars } from 'react-loader-spinner';

interface TileProps {
  id: string;
  isScreenShare?: boolean;
  isLocal?: boolean;
  isAlone?: boolean;
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  isSpotlightTile?: boolean;
  username: string;
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
  username,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    if (audioTrack) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const audioSource = audioContext.createMediaStreamSource(
        new MediaStream([audioTrack]),
      );

      audioSource.connect(analyser);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      audioSourceRef.current = audioSource;

      const checkSpeaking = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setIsSpeaking(volume > 10); // Adjust this threshold as needed
        requestAnimationFrame(checkSpeaking);
      };

      checkSpeaking();

      return () => {
        audioSource.disconnect();
        analyser.disconnect();
        audioContext.close();
      };
    }
  }, [audioTrack]);

  let containerCssClasses = isScreenShare ? 'tile-screenshare' : 'tile-video';

  if (isLocal) {
    containerCssClasses += ' self-view';
    if (isAlone) {
      containerCssClasses += ' alone';
    }
  }

  return (
    <div
      className={`${containerCssClasses} bg-gray-500 flex items-end justify-center  ${
        isSpotlightTile ? ' spotlight-tile' : ' small-tile'
      } 
        ${!videoTrack && !isScreenShare && 'full-width-video'}
        ${!videoTrack && !isScreenShare && !isSpotlightTile && 'no-full-width-video'}
       `}
    >
      {!isSpotlightTile && (
        <div className="bg-black/20 flex items-center justify-center rounded-full absolute p-1 top-2 right-2 z-50">
          <button className="text-white" onClick={() => setSpotlightTile(id)}>
            <PiResizeThin size={20} />
          </button>
        </div>
      )}
      {isSpeaking && !isLocal && (
        <div className="p-2 bg-black/20 rounded-full absolute top-2 left-2 z-50 h-8 w-8 flex items-center justify-center">
          <Bars height={14} color="rgba(255,255,255,0.5)" />
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

      {!videoTrack && !isScreenShare && (
        <PlaceholderTile isSpotlightTile={isSpotlightTile} />
      )}
      {!isScreenShare && <Username id={id} isLocal={isLocal} userName={username} />}
    </div>
  );
};

export default Tile;
