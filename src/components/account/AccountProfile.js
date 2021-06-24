// import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/services/firebase';

const AccountProfile = (props) => {
  const [user] = useAuthState(auth);
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.photoURL}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.displayName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default AccountProfile;
