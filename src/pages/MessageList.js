import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  IconButton
} from '@material-ui/core';
import {
  NavigateNext as NavgateNextIcon,
  NavigateBefore as NavigateBeforeIcon
} from '@material-ui/icons';
import { usePagination } from 'use-pagination-firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import MessageListToolbar from 'src/components/messages/MessageListToolbar';
import MessageCard from 'src/components/messages/MessageCard';
import { auth, firestore } from 'src/services/firebase';

const ProductList = () => {
  const [user] = useAuthState(auth);
  const messagePath = `users/${user && user.uid}/messages`;
  const messagesRef = firestore.collection(messagePath);
  const query = messagesRef.orderBy('createdAt');
  const {
    items: messages,
    isLoading,
    isStart,
    isEnd,
    getPrev,
    getNext,
  } = usePagination(query, { limit: 6 });

  return (
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
              {isLoading ? 'Carregando ...' : messages.map((message) => (
                <Grid
                  item
                  key={message.uid}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <MessageCard message={message} messagePath={messagePath} />
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
            <Grid item container xs={12} justifyContent="flex-end">
              <IconButton onClick={getPrev} disabled={isStart}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton onClick={getNext} disabled={isEnd}>
                <NavgateNextIcon />
              </IconButton>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
