import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { auth } from 'src/services/firebase';
import Logo from './Logo';

const DashboardNavbar = (props) => {
  // const { onMobileNavOpen } = props;
  const navigate = useNavigate();

  return (
    <AppBar
      elevation={0}
      {...props}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={async () => {
            await auth.signOut();
            navigate('/');
          }}
          color="inherit"
        >
          <InputIcon />
        </IconButton>
        {/* <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
