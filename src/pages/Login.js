import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  // Link,
  // TextField,
  Typography
} from '@material-ui/core';
// import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import { auth, firebaseInstance } from 'src/services/firebase';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    navigate('/app/account', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Login | Zeki</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm" sx={{ height: '100vh' }} center>
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              navigate('/app/account', { replace: true });
            }}
          >
            {({
              // errors,
              // handleBlur,
              // handleChange,
              handleSubmit,
              // isSubmitting,
              // touched,
              // values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Login
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Bem vindo ao AutoZap, faça login para continuar
                  </Typography>
                </Box>
                <Grid
                  item
                  xs={12}
                  md={12}
                >
                  <Button
                    fullWidth
                    startIcon={<GoogleIcon />}
                    onClick={signInWithGoogle}
                    size="large"
                    variant="contained"
                  >
                    Entrar com Google
                  </Button>
                </Grid>
                {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Entrar com Facebook
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Ou entre com email
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Não tem conta ?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Cadastre-se
                  </Link>
                </Typography>
               */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
