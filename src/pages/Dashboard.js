import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  // CardMedia,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { usePagination } from 'use-pagination-firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { useSocketEventName, useEmitEvent } from 'src/hooks/SocketProvider';
import BotsApi from 'src/services/BotsApi';
import DashboardSendMessageModal from 'src/components/DashboardSendMessageModal';
import InteractionsApi from 'src/services/InteractionsApi';
import { auth, firestore } from 'src/services/firebase';

const SNACK_BAR_OPTIONS = {
  variant: 'info',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  // content
};

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [botIsConnected, setBotIsConnected] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [isOpened, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messageToSend, setMessageToSend] = useState('');
  const [sendedContacts, setSendedContacts] = useState([]);
  const [user] = useAuthState(auth);
  const contactsPath = `users/${user && user.uid}/contacts`;
  const contactsRef = firestore.collection(contactsPath);
  const query = contactsRef.orderBy('createdAt');
  const {
    items: contacts,
    isEnd,
    getNext,
  } = usePagination(query, { limit: 12 });

  const { subscribe, unsubscribe } = useSocketEventName(`qr-${user && user.uid}`, (data) => {
    setQrCodeImage(data.src);
    setIsLoading(false);
  });
  const { subscribe: subscribeBot, unsubscribe: unsubscribeBot } = useSocketEventName(`ready-${user && user.uid}`, (data) => {
    console.log(data);
    enqueueSnackbar('Bot Conectado com Sucesso!', { ...SNACK_BAR_OPTIONS, variant: 'success' });
    setIsLoading(false);
    setBotIsConnected(true);
  });

  const emitCreateSessionBot = useEmitEvent('create-session');

  async function disconnectBot() {
    setIsLoading(true);
    const response = await BotsApi.disconnectBot();
    setIsLoading(false);
    if (response.value) setBotIsConnected(false);
  }
  async function sendMessages(propMessage) {
    if (isEnd && contacts.length === 0) {
      enqueueSnackbar('Mensagens enviadas com sucesso!', { ...SNACK_BAR_OPTIONS, variant: 'success' });
      return;
    }
    let sended = sendedContacts;
    await Promise.all(contacts.map(async (contact) => {
      console.log(contact.id, propMessage);
      try {
        const response = await InteractionsApi.sendTextMessage({
          message: propMessage,
          phone: contact.id,
          sender: user.uid
        });
        console.log('response:', response);
        // status
        // response
        if (response.status) {
          enqueueSnackbar(`Mensagens enviada para ${contact.name} com sucesso!`, SNACK_BAR_OPTIONS);
        }
        sended = [contact, ...sended];
      } catch (error) {
        console.log(error);
      }
    }));
    await setSendedContacts(sended);
    getNext();
  }

  useEffect(() => {
    const showdSendMessage = !isEnd && sendedContacts.length > 0;
    if (showdSendMessage) sendMessages(messageToSend);
  }, [contacts]);

  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    subscribeBot();
    return unsubscribeBot;
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log(user.uid);
      emitCreateSessionBot({ id: user.uid, description: `Bot de ${user.displayName}, ${user.email}` });
    }
  }, [user, user.uid]);

  return (
    <>
      <Helmet>
        <title>Dashboard | Zeki</title>
      </Helmet>
      <DashboardSendMessageModal
        submitFunction={(p) => {
          setMessageToSend(p.message);
          setOpen(false);
          sendMessages(p.message);
        }}
        isOpened={isOpened}
        setOpen={setOpen}
      />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false} sx={{ height: '100vh', marginTop: '2rem' }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            textAlign="center"
          >
            {!isLoading && !botIsConnected && (
              <Card style={{ display: 'flex', padding: '2rem' }}>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <p>Conectar Whatsapp à instância</p>
                    <p>Para que seja possível enviar mensagens via API precisamos conectar uma conta do Whatsapp a sua instância. Basta seguir os passos abaixo:</p>
                    <br />
                    <p>1. Abra o WhatsApp em seu telefone</p>
                    <p>2. Toque em Menu  ou Configurações  e selecione WhatsApp Web</p>
                    <p>3. Aponte seu telefone para esta tela para capturar o código</p>
                  </Typography>
                </CardContent>
                {qrCodeImage && (
                  <img
                    src={qrCodeImage}
                    alt="Paella dish"
                    width="100%"
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                )}
              </Card>
            )}
            {!isLoading && botIsConnected && (
              <>
                <Card style={{ display: 'flex', padding: '2rem', marginRight: '2rem' }}>
                  <CardContent>
                    <Typography variant="h4" color="textSecondary" component="p" marginBottom={2}>
                      Enviar Mensagem para todos os clientes
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (contacts.length === 0) {
                          window.alert('Registre seus Contatos antes de fazer o envio em massa !!');
                          navigate('/app/customers');
                          return;
                        }
                        setOpen(true);
                      }}
                    >
                      Escrever uma mensagem
                    </Button>
                  </CardContent>
                </Card>
                <Card style={{ display: 'flex', padding: '2rem' }}>
                  <CardContent>
                    <Typography variant="h4" color="textSecondary" component="p" marginBottom={2}>
                      Bot Conectado
                    </Typography>
                    <Button variant="contained" color="error" onClick={disconnectBot}>
                      Desconectar
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
            {isLoading && <CircularProgress color="primary" />}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
