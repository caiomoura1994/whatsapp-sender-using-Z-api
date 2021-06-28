import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Paper, Typography } from '@material-ui/core';
import theme from 'src/theme';

function ChatBubble({ message, myUid }) {
  const { text, uid, createdAt } = message;
  const isMyMessage = myUid === uid;

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 2,
        marginLeft: isMyMessage ? 12 : 2,
        marginRight: isMyMessage ? 2 : 12,
        paddingX: 2,
        paddingY: 3,
        backgroundColor: isMyMessage ? theme.palette.divider : theme.palette.info.light,
      }}
    >
      <Typography
        variant="body2"
      >
        {text}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body2"
        textAlign={isMyMessage ? 'end' : 'start'}
      >
        {moment(createdAt).format('DD/MM/YYYY hh:mm a')}
      </Typography>
    </Paper>
  );
}

ChatBubble.propTypes = {
  message: PropTypes.object,
  myUid: PropTypes.string,
};

export default ChatBubble;
