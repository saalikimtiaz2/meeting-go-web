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
import Chat from 'dailyCo/Chat';
import MeetingInformation from 'dailyCo/MeetingInformation';
import React, { useCallback, useState } from 'react';
import { BsChatText, BsChatTextFill } from 'react-icons/bs';
import { CiMicrophoneOff, CiMicrophoneOn, CiVideoOff, CiVideoOn } from 'react-icons/ci';
import { RxExit } from 'react-icons/rx';
import { SlInfo, SlScreenDesktop } from 'react-icons/sl';

export default function Tray({ leaveCall }: { leaveCall: () => void }) {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } = useScreenShare();

  const [showMeetingInformation, setShowMeetingInformation] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState(false);

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

  const toggleChat = () => {
    setShowChat(!showChat);
    if (newChatMessage) {
      setNewChatMessage(!newChatMessage);
    }
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
      <Chat showChat={showChat} toggleChat={toggleChat} />
      <div className=" flex items-center justify-center gap-x-4 bg-black/50 backdrop-blur-sm rounded-full absolute left-1/2 -translate-x-1/2 bottom-4">
        <div className="flex items-center">
          <TileButton
            onClick={toggleVideo}
            icon={mutedVideo ? <CiVideoOff /> : <CiVideoOn />}
            // text={mutedVideo ? 'Camera On' : 'Camera Off'}
            iconClassName="bg-gray-500"
          />
          <TileButton
            onClick={toggleAudio}
            icon={mutedAudio ? <CiMicrophoneOff /> : <CiMicrophoneOn />}
            // text={mutedAudio ? 'Unmute mic' : 'Mute mic'}
            iconClassName="bg-gray-500 "
          />
        </div>
        <div className="flex items-center  px-8 mx-8">
          <TileButton
            onClick={toggleScreenShare}
            icon={<SlScreenDesktop />}
            // text={isSharingScreen ? 'Stop sharing screen' : 'Share screen'}
            iconClassName="bg-green-500 "
          />
          <TileButton
            onClick={toggleMeetingInformation}
            icon={<SlInfo />}
            // text={showMeetingInformation ? 'Hide info' : 'Show info'}
            iconClassName="bg-gray-500 "
          />
          <TileButton
            onClick={toggleChat}
            icon={newChatMessage ? <BsChatText /> : <BsChatTextFill />}
            // text={showChat ? 'Hide chat' : 'Show chat'}
            iconClassName="bg-gray-500 "
          />
        </div>
        <div className="flex items-center">
          <TileButton
            onClick={leaveCall}
            icon={<RxExit />}
            // text="Leave call"
            iconClassName="bg-red-500 "
          />
        </div>
      </div>
    </div>
  );
}
