/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import ChatBubble from 'src/components/chats/ChatBubble';

function ChatDetailMessages({ messages = [{}] }) {
  const dummy = useRef();

  useEffect(() => {
    setTimeout(() => {
      dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, [messages]);

  return (
    <>
      {messages && messages.map((msg) => (
        <ChatBubble
          // eslint-disable-next-line no-underscore-dangle
          key={msg.id._serialized}
          message={msg.body || ''}
          timestamp={msg.timestamp}
          isFromMe={msg.fromMe}
          msg={msg}
        />
      ))}
      <span ref={dummy} />
    </>
  );
}

ChatDetailMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
};

export default ChatDetailMessages;
