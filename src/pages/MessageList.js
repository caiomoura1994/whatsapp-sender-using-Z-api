import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import MessageListToolbar from 'src/components/messages/MessageListToolbar';
import MessageCard from 'src/components/messages/MessageCard';
import products from 'src/__mocks__/products';

const ProductList = () => (
  <>
    <Helmet>
      <title>Mensagens | Zeki</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <MessageListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <MessageCard message={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
