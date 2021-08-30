import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router';
import { findIndex } from 'lodash';

import ChatFooter from 'src/components/chats/ChatFooter';
import ChatMenuItem from 'src/components/chats/ChatMenuItem';
import ChatDetailMessages from 'src/components/chats/ChatDetailMessages';
import { auth } from 'src/services/firebase';
import ChatApi from 'src/services/ChatApi';
import { useSocketEventName } from 'src/hooks/SocketProvider';

export default function ChatDetail() {
  const paramsProps = useParams();
  const { uid } = auth.currentUser;
  const [formValue, setFormValue] = useState('');
  const [chatDetail, setChatDetail] = useState({});
  const [messages, setMessages] = useState([]);

  const { subscribe, unsubscribe } = useSocketEventName(
    `chat-message-${uid}-${paramsProps.chatId}`,
    ({ payload }) => {
      const alreadyExistsMessage = findIndex(messages, ['timestamp', payload.timestamp]);
      console.log(alreadyExistsMessage, [...messages, payload]);
      if (alreadyExistsMessage === -1) {
        setMessages([...messages, payload]);
      }
    }
  );
  useEffect(() => { subscribe(); return unsubscribe; }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await ChatApi.sendTextMessage({
      phone: paramsProps.chatId.split('@')[0],
      message: formValue,
      sender: uid
    });
    setFormValue('');
  };

  async function initializeChatMessages() {
    const chatDetailResponse = await ChatApi.getChatDetail(uid, paramsProps.chatId);
    setChatDetail(chatDetailResponse || {});
    setMessages(chatDetailResponse.messages || []);
  }

  useEffect(() => {
    initializeChatMessages();
  }, [uid, paramsProps]);

  return (
    <Box maxWidth="40rem" margin="auto">
      <Box
        top={0}
        left={0}
        sx={{ background: 'white' }}
        position="sticky"
        boxShadow={3}
        zIndex={99}
      >
        <ChatMenuItem {...chatDetail} />
      </Box>
      <ChatDetailMessages messages={messages || []} />
      <ChatFooter
        onSubmit={sendMessage}
        buttonProps={{
          type: 'submit',
          disabled: !formValue
        }}
        inputProps={{
          value: formValue,
          onChange: (e) => setFormValue(e.target.value),
        }}
      />
    </Box>
  );
}
