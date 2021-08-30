import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatMenuItem from 'src/components/chats/ChatMenuItem';
import ChatHeader from 'src/components/chats/ChatHeader';
import { useSocketEventName } from 'src/hooks/SocketProvider';
import BotsApi from 'src/services/BotsApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/services/firebase';
import { Button, Skeleton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline',
  },
  divider: {
    marginRight: '12px!important',
  },
  container: {
    maxWidth: '40rem',
    margin: 'auto'
  },
}));

export default function ChatScreen() {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const [chats, setChats] = useState(null);
  const [pagination, setPagination] = useState({});
  const { subscribe, unsubscribe } = useSocketEventName('message', console.log);
  const {
    subscribe: subscribeMessageCreate,
    unsubscribe: unsubscribeMessageCreate
  } = useSocketEventName('messagemessage_create', console.log);

  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, []);

  useEffect(() => {
    subscribeMessageCreate();
    return unsubscribeMessageCreate;
  }, []);

  async function getNextChats() {
    const response = await BotsApi.firstChats({ sender: user.uid, ...pagination });
    console.log('response:', response);
    setChats((oldChats) => [...(oldChats || []), ...response.chats]);
    if (response.chats.length === 0) return;
    setPagination({ limit: response.limit + 4, offset: response.offset + 4 });
  }

  useEffect(() => {
    getNextChats();
  }, []);

  return (
    <div className={classes.container}>
      <ChatHeader />
      <List>
        {!chats && Array(5).fill('').map((_, skeletonIdx) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={`skeletonIdx-${skeletonIdx}`}
            width="100%"
            height="10vh"
            sx={{ margin: '0.5rem 0' }}
          />
        ))}
        {chats && chats.map((chat) => (
          <div key={chat.to}>
            <ChatMenuItem showBadge {...chat} />
          </div>
        ))}
        {Array.isArray(chats) && (
          <Button
            onClick={getNextChats}
            sx={{ marginTop: '2rem' }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Ver mais
          </Button>
        )}
      </List>
    </div>
  );
}

// const MOCKED_MESSAGE = {
//   mediaKey: undefined,
//   id: {
//     fromMe: true,
//     remote: '5571988362338@c.us',
//     id: '3AC3B77DAC39E86EDC6D',
//     _serialized: 'true_5571988362338@c.us_3AC3B77DAC39E86EDC6D'
//   },
//   ack: 1,
//   hasMedia: false,
//   body: 'oi',
//   type: 'chat',
//   timestamp: 1629517030,
//   from: '557188362338@c.us',
//   to: '5571988362338@c.us',
//   author: undefined,
//   deviceType: 'ios',
//   isForwarded: false,
//   forwardingScore: 0,
//   isStatus: false,
//   isStarred: false,
//   broadcast: undefined,
//   fromMe: true,
//   hasQuotedMsg: false,
//   location: undefined,
//   vCards: [],
//   inviteV4: undefined,
//   mentionedIds: [],
//   orderId: undefined,
//   token: undefined,
//   links: []
// };
