import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router';

import ChatFooter from 'src/components/chats/ChatFooter';
import ChatMenuItem from 'src/components/chats/ChatMenuItem';
import ChatDetailMessages from 'src/components/chats/ChatDetailMessages';
import { auth, firestore } from 'src/services/firebase';
import ChatApi from 'src/services/ChatApi';

export default function ChatDetail() {
  const paramsProps = useParams();
  const { uid, photoURL } = auth.currentUser;
  const [formValue, setFormValue] = useState('');
  const [chatDetail, setChatDetail] = useState({});
  const messagesRef = firestore.collection('messages');
  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      uid,
      photoURL
    });
    setFormValue('');
  };
  async function initializeChatMessages() {
    const chatDetailResponse = await ChatApi.getChatDetail(uid, paramsProps.chatId);
    setChatDetail(chatDetailResponse || {});
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
      >
        <ChatMenuItem {...chatDetail} />
      </Box>
      <ChatDetailMessages messages={chatDetail.messages} />
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
