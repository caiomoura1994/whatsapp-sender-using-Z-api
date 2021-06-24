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
import EditIcon from '@material-ui/icons/Edit';

const MessageCard = ({ message, ...rest }) => (
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
        Titulo
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        Minha msg em massa ê ....Minha msg em massa ê ....Minha msg em massa ê ....
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
            05/11/2021 às 00:15
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete">
            <EditIcon color="action" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete">
            <DeleteIcon color="action" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

MessageCard.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageCard;
