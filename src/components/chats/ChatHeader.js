import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import {
  IconButton,
  InputBase,
  Paper,
  Box
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
  },
  container: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 999,
    background: 'white',
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    paddingLeft: 8
  },
}));

export default function ChatHeader() {
  const classes = useStyles();
  return (
    <Box className={classes.container} boxShadow={10}>
      <CardHeader
        avatar={(
          <Avatar
            src="https://e7.pngegg.com/pngimages/790/843/png-clipart-avatar-aang-aang-zuko-azula-katara-korra-aang-human-cartoons.png"
          />
        )}
        title="Caio Moura"
        subheader="71988362338"
      />
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Buscar um contato"
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
