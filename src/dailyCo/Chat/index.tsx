import 'styles/video.scss';

import {
  useAppMessage,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import React, { useCallback, useState } from 'react';

interface Message {
  msg: string;
  name: string;
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

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback(
      (ev: any) =>
        setMessages((existingMessages) => [
          ...existingMessages,
          {
            msg: ev.data.msg,
            name: ev.data.name,
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
      };

      sendAppMessage(newMessage, '*');

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [sendAppMessage, username],
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

  return showChat ? (
    <aside className="chat">
      <button onClick={toggleChat} className="close-chat" type="button">
        Close chat
      </button>
      <ul className="chat-messages">
        {messages.map((message, index) => (
          <li key={`message-${index}`} className="chat-message">
            <span className="chat-message-author">{message?.name}</span>:
            <p className="chat-message-body">{message?.msg}</p>
          </li>
        ))}
      </ul>
      <div className="add-message">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            className="chat-input"
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
    </aside>
  ) : null;
}
