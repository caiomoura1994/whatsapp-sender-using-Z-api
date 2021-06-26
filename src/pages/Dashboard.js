import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  CardContent,
  // CardMedia,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import BotsApi from 'src/services/BotsApi';

const Dashboard = () => {
  const [botIsConnected, setBotIsConnected] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState('');

  async function getQrCode() {
    if (botIsConnected) return;
    const response = await BotsApi.getQrCodeImage();
    if (response.connected) {
      setBotIsConnected(true);
      return;
    }
    setQrCodeImage(response.value);
    console.log('response.value', response.value);
    setTimeout(() => {
      getQrCode();
    }, 3000);
  }
  async function disconnectBot() {
    const response = await BotsApi.disconnectBot();
    if (response.value) setBotIsConnected(false);
  }

  useEffect(() => {
    getQrCode();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | Zeki</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
          >
            {!botIsConnected && (
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
                  />
                )}
              </Card>
            )}
            {botIsConnected && (
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
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
