/* eslint-disable no-mixed-operators */
/* eslint-disable no-underscore-dangle */
// import PropTypes from 'prop-types';
import { useContext } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  // Checkbox,
  // Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import getInitials from 'src/utils/getInitials';
import { CustomersContext, useListCustomersActions } from 'src/hooks/CustomersProvider';

import CustomerModal from './CustomerModal';

const CustomerListResults = (rest) => {
  const {
    paginationOnChange,
    removeContact,
    editContact,
    openEditContactModal,
  } = useListCustomersActions();
  const {
    editModalOpened,
    setEditModalOpened,
    selectedContact,
    contactsRequest,
  } = useContext(CustomersContext);
  const [
    { data: contactsResponse, loading: isLoading },
  ] = contactsRequest;

  return (
    <>
      <CustomerModal
        submitFunction={editContact}
        isOpened={editModalOpened}
        setOpen={setEditModalOpened}
        defaultValue={selectedContact}
      />
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
                {isLoading ? 'Carregando ...' : contactsResponse && contactsResponse.result.map((customer) => (
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
            p: 3
          }}
        >
          <Pagination
            count={contactsResponse && contactsResponse.totalPages || 0}
            color="primary"
            onChange={paginationOnChange}
          />
        </Box>
      </Card>
    </>
  );
};

CustomerListResults.propTypes = {
  // customers: PropTypes.array.isRequired
};

export default CustomerListResults;
