/* eslint-disable no-underscore-dangle */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

function ChatMenuItem(props) {
  const navigate = useNavigate();
  const {
    imageurl,
    name,
    firstMessage,
    id,
    unreadCount,
    showBadge = false
  } = props;

  return (
    <>
      <ListItem
        onClick={() => showBadge && navigate(`/app/chats/${id && id._serialized}`)}
        button={showBadge}
        // eslint-disable-next-line no-underscore-dangle
        alignItems="center"
        divider
      >
        <ListItemAvatar sx={{ display: 'flex', paddingRight: 2 }}>
          {!showBadge && (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => navigate('/app/chats')}
            >
              <ArrowBackIos />
            </IconButton>
          )}
          <Avatar
            alt={name}
            src={imageurl || 'https://www.1zoom.me/big2/946/289597-frederika.jpg'}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ overflowWrap: 'break-word' }}
          primary={name}
          secondary={firstMessage && firstMessage.body}
        />
        {showBadge && (
          <Badge
            showZero
            sx={{ alignSelf: 'center', paddingLeft: 2 }}
            badgeContent={unreadCount}
            color="primary"
          />
        )}
      </ListItem>
    </>
  );
}

ChatMenuItem.propTypes = {
  unreadCount: PropTypes.number,
  imageurl: PropTypes.string,
  name: PropTypes.string,
  firstMessage: PropTypes.object,
  id: PropTypes.object,
  showBadge: PropTypes.bool,
};

export default ChatMenuItem;
