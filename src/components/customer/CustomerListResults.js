// import PropTypes from 'prop-types';
import { useState } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import { usePagination } from 'use-pagination-firestore';
import getInitials from 'src/utils/getInitials';
import { auth, firestore } from 'src/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import CustomerModal from './CustomerModal';

const CustomerListResults = (rest) => {
  const [isOpened, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [user] = useAuthState(auth);
  const contactsPath = `users/${user && user.uid}/contacts`;
  const contactsRef = firestore.collection(contactsPath);
  const query = contactsRef.orderBy('createdAt');
  const {
    items: contacts,
    isLoading,
    isStart,
    isEnd,
    getPrev,
    getNext,
  } = usePagination(query, { limit: 12 });
  const removeContact = async (contact) => {
    console.log(`${contactsPath}/${contact.id}`);
    const canDeleteContact = window.confirm(`Tem certeza que quer excluir ${contact.name} | ${contact.phone}`);
    if (!canDeleteContact) return;
    await firestore.doc(`${contactsPath}/${contact.id}`).delete();
  };

  const editContact = async ({
    name,
    phone,
    ...contactProps
  }) => {
    if (phone && phone.search('-') !== -1) return;
    console.log({
      ...contactProps,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name,
      phone
    });

    const contactsRefToEdit = firestore.collection(`users/${user.uid}/contacts`);
    await contactsRefToEdit.doc(phone).set({
      ...contactProps,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name: name || '-',
      phone,
    });
    setOpen(false);
  };

  const openEditContactModal = async (contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  return (
    <>
      <CustomerModal submitFunction={editContact} isOpened={isOpened} setOpen={setOpen} defaultValue={selectedContact} />
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
                    Editar
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
                          src={customer.profileThumbnail}
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
                      <IconButton onClick={() => openEditContactModal(customer)} aria-label="delete">
                        <EditIcon color="action" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeContact(customer)} aria-label="delete">
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
    </>
  );
};

CustomerListResults.propTypes = {
  // customers: PropTypes.array.isRequired
};

export default CustomerListResults;
