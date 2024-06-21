/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'styles/video.scss';

import {
  useAppMessage,
  useAudioTrack,
  useDaily,
  useLocalSessionId,
  useScreenShare,
  useVideoTrack,
} from '@daily-co/daily-react';
import { TileButton } from 'components/Buttons';
import MeetingInformation from 'dailyCo/MeetingInformation';
import React, { useCallback, useEffect, useState } from 'react';
import { BsChatText, BsChatTextFill } from 'react-icons/bs';
import { CiMicrophoneOff, CiMicrophoneOn, CiVideoOff, CiVideoOn } from 'react-icons/ci';
import { PiSubtitlesSlashThin, PiSubtitlesThin } from 'react-icons/pi';
import { RxExit } from 'react-icons/rx';
import { SlInfo, SlScreenDesktop } from 'react-icons/sl';
import { toast } from 'react-toastify';

export default function Tray({
  leaveCall,
  toggleChat,
  showChat,
  newChatMessage,
  setNewChatMessage,
}: {
  leaveCall: () => void;
  toggleChat: () => void;
  showChat: boolean;
  newChatMessage: boolean;
  setNewChatMessage: (item: boolean) => void;
}) {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } = useScreenShare();

  const [showMeetingInformation, setShowMeetingInformation] = useState(false);

  // -------------speect to text states-----------------------

  const [transcript, setTranscript] = useState<string>('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');

  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  /* When a remote participant sends a message in the chat, we want to display a differently colored
   * chat icon in the Tray as a notification. By listening for the `"app-message"` event we'll know
   * when someone has sent a message. */
  useAppMessage({
    onAppMessage: useCallback(() => {
      /* Only light up the chat icon if the chat isn't already open. */
      if (!showChat) {
        setNewChatMessage(true);
      }
    }, [showChat]),
  });

  const toggleVideo = useCallback(() => {
    callObject?.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject?.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () =>
    isSharingScreen ? stopScreenShare() : startScreenShare();

  const toggleMeetingInformation = () => {
    setShowMeetingInformation(!showMeetingInformation);
  };

  // ------------------------speect to text functioncality
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }
        setInterimTranscript(interimTranscript);
        setTranscript((prev) => {
          const updatedTranscript = prev + finalTranscript;
          if (updatedTranscript.length >= 35) {
            return '';
          }
          return updatedTranscript;
        });
      };

      recognitionInstance.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error', event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      toast.error('Web Speech API is not supported in this browser.');
    }
  }, []);

  const startRecognition = () => {
    recognition?.start();
    setShowTranscript(true);
  };

  const stopRecognition = () => {
    recognition?.stop();
    setShowTranscript(false);
  };

  return (
    <div className="overflow-hidden ">
      <div
        className={`absolute ${
          showMeetingInformation ? ' bottom-4 right-4 ' : '-bottom-full right-4 hidden'
        } transition-all ease-in-out duration-300`}
      >
        <MeetingInformation />
      </div>
      {/*  The chat messages 'live' in the <Chat/> component's state. We can't just remove the component */}
      {/*  from the DOM when hiding the chat, because that would cause us to lose that state. So we're */}
      {/*  choosing a slightly different approach of toggling the chat: always render the component, but only */}
      {/*  render its HTML when showChat is set to true. */}

      {/*   We're also passing down the toggleChat() function to the component, so we can open and close the chat */}
      {/*   from the chat UI and not just the Tray. */}
      <div className="absolute left-1 right-1 bottom-1">
        <div className=" flex items-center justify-center gap-x-4 p-3 bg-white/10 backdrop-blur-sm rounded-full w-max mx-auto">
          <div className="flex items-center gap-x-4">
            <TileButton
              onClick={toggleVideo}
              text={mutedVideo ? 'Turn on Camera' : 'Turn off Camera'}
              icon={mutedVideo ? <CiVideoOff /> : <CiVideoOn />}
              // text={mutedVideo ? 'Camera On' : 'Camera Off'}
              iconClassName="bg-gray-500 border-transparent"
            />
            <TileButton
              onClick={toggleAudio}
              text={mutedAudio ? 'Unmute' : 'Mute'}
              icon={mutedAudio ? <CiMicrophoneOff /> : <CiMicrophoneOn />}
              // text={mutedAudio ? 'Unmute mic' : 'Mute mic'}
              iconClassName="bg-gray-500 border-transparent "
            />
          </div>
          <div className="flex items-center gap-x-4  px-8 mx-8">
            <TileButton
              text="Share Screen"
              onClick={toggleScreenShare}
              icon={<SlScreenDesktop />}
              // text={isSharingScreen ? 'Stop sharing screen' : 'Share screen'}
              iconClassName="bg-green-500 border-transparent "
            />
            <TileButton
              text={'Show Meeting info'}
              onClick={toggleMeetingInformation}
              icon={<SlInfo />}
              // text={showMeetingInformation ? 'Hide info' : 'Show info'}
              iconClassName="bg-gray-500 border-transparent "
            />
            <div className="relative">
              {newChatMessage && (
                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
              )}
              <TileButton
                onClick={toggleChat}
                text="Chat"
                icon={newChatMessage ? <BsChatTextFill /> : <BsChatText />}
                // text={showChat ? 'Hide chat' : 'Show chat'}
                iconClassName="bg-gray-500 border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            {!showTranscript ? (
              <TileButton
                text={'Show transctipt'}
                onClick={startRecognition}
                icon={<PiSubtitlesThin size={30} />}
                iconClassName="bg-blue-500 border-transparent "
              />
            ) : (
              <TileButton
                text={'Hide transctipt'}
                onClick={stopRecognition}
                icon={<PiSubtitlesSlashThin size={30} />}
                iconClassName="bg-blue-500 border-transparent "
              />
            )}
            <TileButton
              text="Leave meeting"
              onClick={leaveCall}
              icon={<RxExit />}
              // text="Leave call"
              iconClassName="bg-red-500 border-transparent "
            />
          </div>
        </div>
        <div className="mt-4">
          {showTranscript && (transcript.length > 1 || interimTranscript.length > 1) && (
            <p className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-xl w-max mx-auto">
              {transcript + interimTranscript}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
