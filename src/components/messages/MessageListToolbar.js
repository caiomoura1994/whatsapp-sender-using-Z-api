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
import MessageModal from './MessageModal';

const MessageListToolbar = (props) => {
  const [isOpened, setOpen] = React.useState(false);
  return (
    <>
      <MessageModal isOpened={isOpened} setOpen={setOpen} />
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Criar Mensagem
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
                  placeholder="Pesquisar mensagem"
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

export default MessageListToolbar;
