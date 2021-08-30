/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Paper, Typography } from '@material-ui/core';
import theme from 'src/theme';

function ChatBubble({
  message,
  isFromMe,
  timestamp,
  msg = {}
}) {
  console.log(msg);
  let attachmentData = '';
  const isAudioMessage = msg.type === 'ptt';
  if (isAudioMessage) attachmentData = `data:audio/ogg;codecs=opus;base64,${msg.attachmentData}`;
  const isImageMessage = msg.type === 'image';
  if (isImageMessage) attachmentData = `data:image/png;base64,${msg.attachmentData}`;
  const isPdfMessage = msg.type === 'document';
  if (isPdfMessage) attachmentData = `data:application/pdf;base64,${msg.attachmentData}`;
  return (
    <Paper
      elevation={3}
      sx={{
        margin: 2,
        marginLeft: isFromMe ? 12 : 2,
        marginRight: isFromMe ? 2 : 12,
        paddingX: 2,
        paddingY: 3,
        backgroundColor: isFromMe ? theme.palette.divider : theme.palette.info.light,
        wordBreak: 'break-word'
      }}
    >
      {message && (
        <Typography
          variant="body2"
        >
          {message}
        </Typography>
      )}
      {isAudioMessage && <audio style={{ width: '100%' }} controls src={attachmentData} />}
      {isImageMessage && <img style={{ width: '100%' }} alt="" src={attachmentData} />}
      {isPdfMessage && <iframe title="Pdf" src={attachmentData} />}
      {isPdfMessage && <object title="Pdf" data={attachmentData} />}
      <Typography
        color="textSecondary"
        variant="body2"
        textAlign={isFromMe ? 'end' : 'start'}
      >
        {moment(timestamp).format('DD/MM/YYYY hh:mm a')}
      </Typography>
    </Paper>
  );
}

ChatBubble.propTypes = {
  message: PropTypes.object,
  timestamp: PropTypes.number,
  isFromMe: PropTypes.bool,
  msg: PropTypes.object,
};

export default ChatBubble;
