import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { firestore } from 'src/services/firebase';

const MessageCard = ({ message, messagePath, ...rest }) => {
  const removeMessage = async () => {
    console.log(`${messagePath}/${message.id}`);
    await firestore.doc(`${messagePath}/${message.id}`).delete();
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {message.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {message.message}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <IconButton aria-label="delete">
              <AccessTimeIcon color="action" />
            </IconButton>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {moment(message.datetime).format('DD/MM/YYYY hh:mm a')}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={removeMessage} aria-label="delete">
              <DeleteIcon color="action" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

MessageCard.propTypes = {
  message: PropTypes.object.isRequired,
  messagePath: PropTypes.string
};

export default MessageCard;
