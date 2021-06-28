import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Divider } from '@material-ui/core';
import ChatMenuItem from 'src/components/chats/ChatMenuItem';
import ChatHeader from 'src/components/chats/ChatHeader';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline',
  },
  divider: {
    marginRight: '12px!important',
  },
}));

export default function ChatScreen() {
  const classes = useStyles();

  return (
    <>
      <ChatHeader />
      <List className={classes.divider}>
        <ChatMenuItem />
        <Divider className={classes.divider} variant="inset" component="li" />
        <ChatMenuItem />
        <ChatMenuItem />
        <ChatMenuItem />
        <ChatMenuItem />
        <ChatMenuItem />
        <ChatMenuItem />
      </List>
    </>
  );
}
