import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Input,
  InputAdornment,
  Paper
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline',
  },
  divider: {
  },
}));

function ChatFooter({ onSubmit, inputProps, buttonProps }) {
  const classes = useStyles();

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
      <Input
        className={classes.divider}
        placeholder="Digite aqui sua mensagem ..."
        fullWidth
        sx={{ minHeight: 48, paddingX: 1 }}
        rows={3}
        endAdornment={(
          <IconButton {...buttonProps}>
            <InputAdornment position="end">
              <SendIcon />
            </InputAdornment>
          </IconButton>
        )}
        {...inputProps}
      />
    </Paper>
  );
}

ChatFooter.propTypes = {
  inputProps: PropTypes.object,
  buttonProps: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ChatFooter;
