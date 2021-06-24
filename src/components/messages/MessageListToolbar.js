import * as React from 'react';
import {
  Box,
  Button,
} from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, firebaseInstance, firestore } from 'src/services/firebase';
import MessageModal from './MessageModal';

const MessageListToolbar = (props) => {
  const [isOpened, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);

  const createNewMessage = async ({
    title,
    message,
    datetime
  }) => {
    const messagesRef = firestore.collection(`users/${user.uid}/messages`);
    await messagesRef.add({
      message,
      createdAt: firebaseInstance.firestore.FieldValue.serverTimestamp(),
      title,
      datetime
    });
    setOpen(false);
  };

  return (
    <>
      <MessageModal submitFunction={createNewMessage} isOpened={isOpened} setOpen={setOpen} />
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Criar Mensagem
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MessageListToolbar;
