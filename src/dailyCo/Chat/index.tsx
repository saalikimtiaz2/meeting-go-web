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
}

export default function Chat({
  showChat,
  toggleChat,
}: {
  showChat: boolean;
  toggleChat: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const localSessionId = useLocalSessionId();
  const username = useParticipantProperty(localSessionId, 'user_name');
  const userId = useParticipantProperty(localSessionId, 'user_id');

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback(
      (ev: any) =>
        setMessages((existingMessages) => [
          ...existingMessages,
          {
            msg: ev.data.msg,
            name: ev.data.name,
            userId: ev.data.userId,
          },
        ]),
      [],
    ),
  });

  const sendMessage = useCallback(
    (message: string) => {
      const newMessage = {
        msg: message,
        name: username || 'Guest',
        userId: userId,
      };

      sendAppMessage(newMessage, '*');

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [sendAppMessage, username, userId],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // don't allow people to submit empty strings
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
          <Heading2>Participent</Heading2>
          <button onClick={toggleChat} className="text-gray-500 " type="button">
            <IoCloseOutline size={30} />
          </button>
        </div>
        hello
      </div>
      <div className="h-3/5 w-full bg-secondary dark:bg-gray-950 rounded-xl overflow-hidden p-4">
        <Heading2 className="mb-4">Live Chat</Heading2>
        <ul className="chat-messages">
          {messages.map((message, index) => (
            <li
              key={`message-${index}`}
              className={`bg-gray-700 p-2 rounded-xl flex items-start gap-x-4 mb-1 w-4/5 ${
                userId === message.userId && 'ml-auto flex-row-reverse'
              }`}
            >
              <span className="chat-message-author">
                <Avatar size={8} />
                {/* {message?.name} */}
              </span>
              <p className="chat-message-body grow">{message?.msg}</p>
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
