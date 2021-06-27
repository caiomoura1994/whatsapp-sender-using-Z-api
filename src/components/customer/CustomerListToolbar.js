import * as React from 'react';
import {
  Box,
  Button,
  // Card,
  // CardContent,
  // TextField,
  // InputAdornment,
  // SvgIcon,
  Typography
} from '@material-ui/core';
// import { Search as SearchIcon } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import moment from 'moment';

import { auth, firestore } from 'src/services/firebase';
import InteractionsApi from 'src/services/InteractionsApi';
import CustomerModal from './CustomerModal';

const CustomerListToolbar = (props) => {
  const navigate = useNavigate();
  const [isOpened, setOpen] = React.useState(false);
  const [importingContacts, setImportingContacts] = React.useState(false);
  const [totalContacts, setTotalContacts] = React.useState(0);
  const [user] = useAuthState(auth);

  const getTotalContacts = async () => {
    const contactsRef = firestore.collection(`users/${user && user.uid}/contacts`);
    const { size } = await contactsRef.get();
    setTotalContacts(size);
  };

  // const deleteAllLeads = () => {
  //   firestore.doc(`users/${user && user.uid}/contacts`).delete();
  // };

  const createNewContact = async ({
    name,
    phone,
    ...contactProps
  }) => {
    if (phone && phone.search('-') !== -1) return;
    const contactsRef = firestore.collection(`users/${user && user.uid}/contacts`);
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
    if (chats.error) {
      window.alert('Seu celular não está conectado!');
      navigate('/app/dashboard');
      return;
    }
    if (chats && chats.length === 0) {
      setImportingContacts(false);
      return;
    }
    console.log(chats);
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
            {`${totalContacts} contatos importados`}
          </Typography>
          <Button disabled={importingContacts} onClick={importContacts} sx={{ mx: 2 }}>
            Importar contatos
          </Button>
          <Button
            sx={{ mx: 2 }}
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Adicionar Contato
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => navigate('/app/dashboard')}
          >
            Mandar Mensagem
          </Button>
        </Box>
        {/* <Box sx={{ mt: 3 }}>
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
        </Box> */}
      </Box>
    </>
  );
};

export default CustomerListToolbar;
