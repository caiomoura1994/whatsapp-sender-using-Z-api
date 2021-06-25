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

function CustomerModal(props) {
  const { setOpen, isOpened, submitFunction } = props;
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    name: '',
    phone: '',
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
                      label="Nome"
                      name="name"
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item container>
                    <TextField
                      fullWidth
                      label="Telefone"
                      name="phone"
                      onChange={handleChange}
                      required
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>
                  {/* <Grid item container>
                    <TextField
                      fullWidth
                      label="Tags"
                      name="tags"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true, multiple: true }}
                      value={values.tags}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid> */}
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
                  onClick={() => submitFunction(values)}
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

CustomerModal.propTypes = {
  setOpen: PropTypes.func,
  submitFunction: PropTypes.func,
  isOpened: PropTypes.bool
};

export default CustomerModal;
