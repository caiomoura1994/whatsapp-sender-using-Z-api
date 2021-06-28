import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default function ChatMenuItem() {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://www.1zoom.me/big2/946/289597-frederika.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Avatar de pandora  "
          secondary={`Locais  e valores
          Pituacu 6.00
          Imbui 5.00
          Brotas 15.00`}
        />
        <Badge sx={{ alignSelf: 'center', paddingLeft: 2 }} badgeContent={4} color="primary" />
      </ListItem>
    </>
  );
}
