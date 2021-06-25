import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

import { auth, firestore } from 'src/services/firebase';
import CustomerModal from './CustomerModal';

const CustomerListToolbar = (props) => {
  const [isOpened, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);

  const createNewContact = async ({
    name,
    phone
  }) => {
    const contactsRef = firestore.collection(`users/${user.uid}/contacts`);
    await contactsRef.add({
      createdAt: moment().format('yyyy-MM-DDThh:mm'),
      name,
      phone
    });
    setOpen(false);
  };

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
          <Button sx={{ mx: 2 }}>
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
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default CustomerListToolbar;
