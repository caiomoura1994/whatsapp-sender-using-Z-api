import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 1
};

function DashboardSendMessageModal(props) {
  const { setOpen, isOpened, submitFunction } = props;
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    message: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpened}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpened}>
        <Box sx={style}>
          <form
            autoComplete="off"
            noValidate
            {...props}
          >
            <Card>
              <CardHeader
                subheader="Sua mensagem vai ser enviada imediatamente"
                title="Envio em Massa"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item container>
                    <TextField
                      label="Mensagem"
                      name="message"
                      onChange={handleChange}
                      value={values.message}
                      variant="outlined"
                      fullWidth
                      multiline
                      required
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    if (!values.message) return;
                    const confirmed = window.confirm('Essa mensagem vai ser enviada para todos os clientes na sua base de dados!');
                    if (!confirmed) return;
                    submitFunction(values);
                  }}
                >
                  Enviar
                </Button>
              </Box>
            </Card>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

DashboardSendMessageModal.propTypes = {
  setOpen: PropTypes.func,
  submitFunction: PropTypes.func,
  isOpened: PropTypes.bool
};

export default DashboardSendMessageModal;
