import React, { useState } from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';

import ChatFooter from 'src/components/chats/ChatFooter';
import ChatMenuItem from 'src/components/chats/ChatMenuItem';
import ChatDetailMessages from 'src/components/chats/ChatDetailMessages';
import { auth, firestore } from 'src/services/firebase';

export default function ChatDetail() {
  const { uid, photoURL } = auth.currentUser;
  const [formValue, setFormValue] = useState('');
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

  return (
    <>
      <Box
        top={0}
        left={0}
        sx={{ background: 'white' }}
        position="sticky"
        boxShadow={3}
      >
        <ChatMenuItem />
      </Box>
      <ChatDetailMessages />
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
    </>
  );
}
