import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatMenuItem from 'src/components/chats/ChatMenuItem';
import ChatHeader from 'src/components/chats/ChatHeader';
import { useSocketEventName } from 'src/hooks/SocketProvider';
import BotsApi from 'src/services/BotsApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/services/firebase';

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
  const [chats, setChats] = useState([]);
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

  async function initChats() {
    const response = await BotsApi.firstChats(user.uid);
    setChats(response.chats);
  }

  useEffect(() => {
    initChats();
  }, []);

  return (
    <div className={classes.container}>
      <ChatHeader />
      <List>
        {chats.map((chat) => (
          <div key={chat.to}>
            <ChatMenuItem showBadge {...chat} />
          </div>
        ))}
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
