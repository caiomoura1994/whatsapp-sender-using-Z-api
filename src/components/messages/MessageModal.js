import * as React from 'react';
import moment from 'moment';
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

function MessageModal(props) {
  const { setOpen, isOpened, submitFunction } = props;
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    title: '',
    message: '',
    datetime: moment().format('yyyy-MM-DDThh:mm'),
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
                subheader="Dados do contato"
                title="Novo Contato"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item container>
                    <TextField
                      fullWidth
                      label="Título"
                      name="title"
                      onChange={handleChange}
                      required
                      value={values.title}
                      variant="outlined"
                    />
                  </Grid>
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
                    />
                  </Grid>
                  <Grid item container>
                    <TextField
                      fullWidth
                      label="Data de envio"
                      name="datetime"
                      type="datetime-local"
                      onChange={handleChange}
                      required
                      value={values.datetime}
                      variant="outlined"
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
                    if (!values.datetime || !values.message || !values.title) {
                      return;
                    }
                    submitFunction(values);
                  }}
                >
                  Salvar
                </Button>
              </Box>
            </Card>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

MessageModal.propTypes = {
  setOpen: PropTypes.func,
  submitFunction: PropTypes.func,
  isOpened: PropTypes.bool
};

export default MessageModal;
