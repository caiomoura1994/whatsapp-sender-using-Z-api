import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Box
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline',
  },
  divider: {
  },
}));

function ChatFooter({ onSubmit, inputProps, buttonProps }) {
  const classes = useStyles();
  const [hiddenEmojiPicker, setHiddenEmojiPicker] = useState(true);
  const onEmojiClick = (event, emojiObject) => {
    inputProps.onChange({
      target: {
        value: `${inputProps.value}${emojiObject.emoji}`
      }
    });
  };

  return (
    <Paper
      sx={{
        position: 'sticky',
        bottom: 0,
        background: 'white',
        width: '100%',
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <Box
        position="absolute"
        bottom="3rem"
        right="1rem"
        hidden={hiddenEmojiPicker}
      >
        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus
          skinTone={SKIN_TONE_MEDIUM_DARK}
          // groupNames={{ smileys_people: 'PEOPLE' }}
          native
        />
      </Box>
      <Box display="flex">
        <Input
          className={classes.divider}
          placeholder="Digite aqui sua mensagem ..."
          fullWidth
          sx={{ minHeight: 48, paddingX: 1 }}
          rows={3}
          endAdornment={(
            <IconButton onClick={() => setHiddenEmojiPicker((status) => !status)}>
              <InputAdornment position="end">
                <EmojiEmotionsIcon />
              </InputAdornment>
            </IconButton>
          )}
          {...inputProps}
        />
        <IconButton {...buttonProps}>
          <InputAdornment position="end">
            <SendIcon />
          </InputAdornment>
        </IconButton>
      </Box>
    </Paper>
  );
}

ChatFooter.propTypes = {
  inputProps: PropTypes.object,
  buttonProps: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ChatFooter;
