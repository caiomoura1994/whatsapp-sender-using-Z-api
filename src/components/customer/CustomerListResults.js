// import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  // Checkbox,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import {
  NavigateNext as NavgateNextIcon,
  NavigateBefore as NavigateBeforeIcon
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { usePagination } from 'use-pagination-firestore';
import getInitials from 'src/utils/getInitials';
import { auth, firestore } from 'src/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const CustomerListResults = (rest) => {
  const [user] = useAuthState(auth);
  const contactsPath = `users/${user.uid}/contacts`;
  const contactsRef = firestore.collection(contactsPath);
  const query = contactsRef.orderBy('createdAt');
  const {
    items: contacts,
    isLoading,
    isStart,
    isEnd,
    getPrev,
    getNext,
  } = usePagination(query, { limit: 6 });
  const removeContact = async (contactId) => {
    console.log(`${contactsPath}/${contactId}`);
    await firestore.doc(`${contactsPath}/${contactId}`).delete();
  };

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;
  //   if (event.target.checked) {
  //     newSelectedCustomerIds = customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }
  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };
  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];
  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Telefone
                </TableCell>
                <TableCell>
                  Data de cadastro
                </TableCell>
                <TableCell>
                  Excluir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? 'Carregando ...' : contacts.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY hh:mm a')}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeContact(customer.id)} aria-label="delete">
                      <DeleteIcon color="action" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 3
        }}
      >
        <Grid item container xs={12} justifyContent="flex-end">
          <IconButton onClick={getPrev} disabled={isStart}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={getNext} disabled={isEnd}>
            <NavgateNextIcon />
          </IconButton>
        </Grid>
      </Box>
    </Card>
  );
};

CustomerListResults.propTypes = {
  // customers: PropTypes.array.isRequired
};

export default CustomerListResults;
