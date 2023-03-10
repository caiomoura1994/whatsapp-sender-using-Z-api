import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
// import AccountProfileDetails from 'src/components/account/AccountProfileDetails';

const Account = () => (
  <>
    <Helmet>
      <title>Account | Zeki</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          <Grid item>
            <AccountProfile />
          </Grid>
          {/* <Grid item>
            <AccountProfileDetails />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
