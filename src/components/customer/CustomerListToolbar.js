import * as React from 'react';
import {
  Box,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useActionCustomers } from 'src/hooks/CustomersProvider';

const CustomerListToolbar = ({ ...props }) => {
  const {
    deleteAllContactsLoading,
    deleteAllLeads,
    importContacts,
    importingContactsLoading,
    navigate,
  } = useActionCustomers();

  return (
    <>
      {/* <CustomerModal submitFunction={createNewContact} isOpened={isOpened} setOpen={setOpen} /> */}
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button disabled={importingContactsLoading} onClick={importContacts} sx={{ mx: 2 }}>
            {!importingContactsLoading && 'Importar contatos'}
            {importingContactsLoading && <CircularProgress />}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={deleteAllLeads}
            sx={{ mx: 2 }}
            disabled={deleteAllContactsLoading}
          >
            {!deleteAllContactsLoading && 'Excluir todos'}
            {deleteAllContactsLoading && <CircularProgress />}
          </Button>
          {/* <Button
            sx={{ mx: 2 }}
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Adicionar Contato
          </Button> */}
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
