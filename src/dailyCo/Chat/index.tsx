import 'styles/video.scss';

import {
  useAppMessage,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import Avatar from 'components/MagicUI/Avatar';
import { Heading2 } from 'components/Typography/Heading';
import React, { useCallback, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface Message {
  msg: string;
  name: string;
  userId: string;
  avatarURL: string;
}

type ParticipantDataTypes = {
  [id: string]: {
    videoTrack: MediaStreamTrack | null;
    audioTrack: MediaStreamTrack | null;
    isLocal: boolean;
    isOwner: boolean;
    userName: string;
    userId: string;
    audioStatus: string;
    videoStatus: string;
    screenShareStatus: string;
    isSpotlited: boolean;
    avatarURL: string;
  };
};

interface UserDataTypes {
  avatar_url: string;
}

export default function Chat({
  showChat,
  toggleChat,
  participants,
}: {
  showChat: boolean;
  toggleChat: () => void;
  participants: ParticipantDataTypes;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const localSessionId = useLocalSessionId();
  const username = useParticipantProperty(localSessionId, 'user_name');
  const userId = useParticipantProperty(localSessionId, 'user_id');
  const userData = useParticipantProperty(localSessionId, 'userData') as UserDataTypes;

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback(
      (ev: any) =>
        setMessages((existingMessages) => [
          ...existingMessages,
          {
            msg: ev.data.msg,
            name: ev.data.name,
            userId: ev.data.userId,
            avatarURL: userData.avatar_url, // Use userData.avatar_url directly
          },
        ]),
      [userData.avatar_url],
    ),
  });

  const sendMessage = useCallback(
    (message: string) => {
      const newMessage = {
        msg: message,
        name: username || 'Guest',
        userId: userId,
        avatarURL: userData.avatar_url, // Include avatarURL in the message
      };

      sendAppMessage(newMessage, '*');

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [sendAppMessage, username, userId, userData.avatar_url],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // don't allow empty messages
    sendMessage(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    console.log('Messages: ', messages);
  }, [messages]);

  return showChat ? (
    <aside className="chat flex flex-col gap-y-4 w-full">
      <div className="h-2/5 w-full bg-secondary dark:bg-gray-950 rounded-xl overflow-hidden p-4 ">
        <div className="flex items-center justify-between">
          <Heading2>Participant</Heading2>
          <button onClick={toggleChat} className="text-gray-500" type="button">
            <IoCloseOutline size={30} />
          </button>
        </div>
        <div id="scrollbar1" className="h-[90%] pt-4">
          {Object.entries(participants).map(([id, user]) => (
            <div key={id} className="flex items-center gap-x-2 py-2">
              <Avatar size={8} url={user.avatarURL} /> {/* Display Avatar with src */}
              {user.userName || 'Guest'} {user.isLocal && '(You)'}
              {user.isOwner && (
                <div className="text-xs text-white bg-primary px-2 rounded-full">
                  Host
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-3/5 w-full bg-secondary dark:bg-gray-950 rounded-xl overflow-hidden p-4">
        <Heading2 className="mb-4">Live Chat</Heading2>
        <ul className="chat-messages">
          {messages.map((message, index) => (
            <li
              key={`message-${index}`}
              className={`flex items-start gap-x-4 mb-2 w-4/5 overflow-x-hidden ${
                userId === message.userId ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <span className="chat-message-author">
                <Avatar size={8} url={message.avatarURL} />
              </span>
              <p
                className={`chat-message-body w-[90%] p-3 whitespace-pre-wrap overflow-x-hidden ${
                  userId === message.userId
                    ? 'bg-primary rounded-b-2xl rounded-tl-2xl text-white '
                    : 'bg-white text-black dark:bg-gray-700 dark:text-white rounded-b-2xl rounded-tr-2xl'
                }`}
              >
                {message?.msg}
              </p>
            </li>
          ))}
        </ul>
        <div className="add-message">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
              type="text"
              placeholder="Type your message here.."
              value={inputValue}
              onChange={handleChange}
            />
            <button type="submit" className="chat-submit-button">
              {/* <Arrow /> */}
            </button>
          </form>
        </div>
      </div>
    </aside>
  ) : null;
}
