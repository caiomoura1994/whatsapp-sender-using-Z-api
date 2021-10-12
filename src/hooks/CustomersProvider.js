/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import ContactsApi from 'src/services/ContactsApi';
import InteractionsApi from 'src/services/InteractionsApi';
import { useSocketEventName } from 'src/hooks/SocketProvider';
import { auth } from 'src/services/firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { useAxios } from 'src/services';

const SNACK_BAR_OPTIONS = {
  variant: 'info',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  preventDuplicate: true
};

export const CustomersContext = React.createContext(null);

const CustomersProvider = ({
  children = null
}) => {
  const [selectedContact, setSelectedContact] = useState({});
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [user] = useAuthState(auth);
  const contactsRequest = useAxios(`/contacts?limit=12&owner=${user.uid}`, {});
  return (
    <CustomersContext.Provider
      value={{
        contactsRequest,
        selectedContact,
        setSelectedContact,
        user,
        editModalOpened,
        setEditModalOpened,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

CustomersProvider.propTypes = {
  children: PropTypes.element,
};

export default CustomersProvider;

export const useImportContactsSocket = ({ enqueueSnackbar, user, setImportingContactsLoading }) => {
  const { subscribe, unsubscribe } = useSocketEventName(`importContacts-${user && user.uid}`, (data) => {
    console.log(data);
    const variant = data.imported ? 'success' : 'error';
    if (!data.imported) setImportingContactsLoading(false);
    enqueueSnackbar(data.message, { ...SNACK_BAR_OPTIONS, variant });
  });

  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, [user]);
};

export const useListCustomersActions = () => {
  const {
    contactsRequest,
    user,
    setEditModalOpened,
    setSelectedContact
  } = useContext(CustomersContext);
  const [, refetch] = contactsRequest;

  const paginationOnChange = async (_, page) => {
    await refetch({ params: { page, limit: 12, owner: user.uid } });
  };

  const removeContact = async (contact) => {
    const canDeleteContact = window.confirm(`Tem certeza que quer excluir ${contact.name} | ${contact.phone}`);
    if (!canDeleteContact) return;
    await ContactsApi.destroy(contact._id);
    refetch();
  };

  const editContact = async ({
    name,
    phone,
    ...contactProps
  }) => {
    if (phone && phone.search('-') !== -1) return;
    await ContactsApi.update(contactProps._id, {
      ...contactProps,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name: name || '-',
      phone,
    });
    refetch();
    setEditModalOpened(false);
  };

  const openEditContactModal = async (contact) => {
    setSelectedContact(contact);
    setEditModalOpened(true);
  };

  return {
    paginationOnChange,
    removeContact,
    editContact,
    openEditContactModal,
    contactsRequest,
  };
};

export const useActionCustomers = () => {
  const { user, contactsRequest } = useContext(CustomersContext);
  const [, refetch] = contactsRequest;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [importingContactsLoading, setImportingContactsLoading] = React.useState(false);
  const [deleteAllContactsLoading, setDeleteAllContactsLoading] = React.useState(false);

  useImportContactsSocket({ enqueueSnackbar, user, setImportingContactsLoading });

  const importContacts = async () => {
    setImportingContactsLoading(true);
    await InteractionsApi.importAllLeads({ sender: user.uid });
    enqueueSnackbar('Contatos importados com sucesso!', SNACK_BAR_OPTIONS);
    setImportingContactsLoading(false);
    refetch();
  };

  const deleteAllLeads = async () => {
    setDeleteAllContactsLoading(true);
    const deletedContactsResponse = await ContactsApi.destroyAll(user.uid);
    const variant = deletedContactsResponse.deleted ? 'success' : 'error';
    enqueueSnackbar(deletedContactsResponse.message, { ...SNACK_BAR_OPTIONS, variant });
    setDeleteAllContactsLoading(false);
    refetch();
  };

  return {
    deleteAllContactsLoading,
    deleteAllLeads,
    importContacts,
    importingContactsLoading,
    navigate,
  };
};
