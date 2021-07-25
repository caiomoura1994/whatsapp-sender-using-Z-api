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
import { useSnackbar } from 'notistack';

import { useSocketEventName } from 'src/hooks/SocketProvider';
import { auth, firestore } from 'src/services/firebase';
import InteractionsApi from 'src/services/InteractionsApi';
import CustomerModal from './CustomerModal';

const SNACK_BAR_OPTIONS = {
  variant: 'info',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  preventDuplicate: true
};

const CustomerListToolbar = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isOpened, setOpen] = React.useState(false);
  const [importingContacts, setImportingContacts] = React.useState(false);
  const [totalContacts, setTotalContacts] = React.useState(0);
  const [user] = useAuthState(auth);

  const { subscribe, unsubscribe } = useSocketEventName(`importContacts-${user && user.uid}`, (data) => {
    console.log(data);
    const variant = data.imported ? 'success' : 'error';
    enqueueSnackbar(data.message, { ...SNACK_BAR_OPTIONS, variant });
  });

  const getTotalContacts = async () => {
    const contactsRef = firestore.collection(`users/${user && user.uid}/contacts`);
    const { size } = await contactsRef.get();
    setTotalContacts(size);
  };

  // const deleteAllLeads = () => {
  //   firestore.doc(`users/${user && user.uid}/contacts`).delete();
  // };

  const createNewContact = async (contactProps) => {
    if (!contactProps) return;
    const phone = contactProps.phone || contactProps.id.user;
    const name = contactProps.name || contactProps.pushname || contactProps.verifiedName || '-';
    if (phone && phone.search('-') !== -1) return;
    const contactsRef = firestore.collection(`users/${user && user.uid}/contacts`);
    await contactsRef.doc(phone).set({
      ...contactProps,
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name,
      phone,
      profileThumbnail: contactProps.imageurl || '',
    });
    setOpen(false);
  };

  const importContacts = async () => {
    setImportingContacts(true);
    await InteractionsApi.getAllChats({ sender: user.uid });
    enqueueSnackbar('Solicitação enviada! Em até 24h estaremos importando seus contatos!', SNACK_BAR_OPTIONS);
    setImportingContacts(false);
  };

  React.useEffect(() => {
    getTotalContacts();
  }, []);

  React.useEffect(() => {
    subscribe();
    return unsubscribe;
  }, [user]);

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
