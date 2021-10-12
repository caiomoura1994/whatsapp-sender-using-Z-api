import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import CustomersProvider from 'src/hooks/CustomersProvider';

const CustomerList = () => (
  <>
    <Helmet>
      <title>Contatos | Zeki</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <CustomersProvider>
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <CustomerListResults />
          </Box>
        </Container>
      </CustomersProvider>
    </Box>
  </>
);

export default CustomerList;
