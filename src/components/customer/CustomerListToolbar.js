import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

import { auth, firestore } from 'src/services/firebase';
import InteractionsApi from 'src/services/InteractionsApi';
import CustomerModal from './CustomerModal';

const CustomerListToolbar = (props) => {
  const [isOpened, setOpen] = React.useState(false);
  const [importingContacts, setImportingContacts] = React.useState(false);
  const [totalContacts, setTotalContacts] = React.useState(0);
  const [user] = useAuthState(auth);

  const getTotalContacts = async () => {
    const contactsRef = firestore.collection(`users/${user.uid}/contacts`);
    const { size } = await contactsRef.get();
    setTotalContacts(size);
  };

  const deleteAllLeads = () => {
    firestore.doc(`users/${user.uid}/contacts`).delete();
  };

  const createNewContact = async ({
    name,
    phone,
    ...contactProps
  }) => {
    if (phone && phone.search('-') !== -1) return;
    const contactsRef = firestore.collection(`users/${user.uid}/contacts`);
    console.log({
      ...contactProps,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name,
      phone
    });
    await contactsRef.doc(phone).set({
      ...contactProps,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name: name || '-',
      phone,
    });
    setOpen(false);
  };

  let page = 1;
  const importContacts = async () => {
    setImportingContacts(true);
    const chats = await InteractionsApi.getAllChats({ page, pageSize: 10 });
    if (chats && chats.length === 0) {
      setImportingContacts(false);
      return;
    }
    await Promise.all(chats.map(createNewContact));
    page += 1;
    getTotalContacts();
    setTimeout(() => {
      importContacts();
    }, 5000);
  };

  React.useEffect(() => {
    getTotalContacts();
  }, []);

  return (
    <>
      <CustomerModal submitFunction={createNewContact} isOpened={isOpened} setOpen={setOpen} />
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Typography
            color="textSecondary"
            variant="body2"
            alignSelf="center"
          >
            {totalContacts}
          </Typography>
          <Button disabled={importingContacts} onClick={importContacts} sx={{ mx: 2 }}>
            Importar contatos
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Adicionar Contato
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ maxWidth: 500, width: '100%' }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Pesquisar contato"
                  variant="outlined"
                />
              </Box>
              <Button
                color="error"
                variant="contained"
                onClick={deleteAllLeads}
              >
                Excluir todos
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default CustomerListToolbar;
