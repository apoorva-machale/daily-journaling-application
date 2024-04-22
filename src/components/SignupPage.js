import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-hot-toast';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignupPage(props) {
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  var errordisplay;
  function isError(_errors){
    
  if (_errors.email) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect EmailId</Alert>
      </div>
    );
  }
  if (_errors.password) {
    errordisplay = (
      <div>
        <Alert severity="error">Incorrect Password</Alert>
      </div>
    );
  }
  }
  function formIsValid() {
    const _errors = {};
    const re = /^[a-zA-Z0-9_.-]+@gmail.com$/;
    const etest = re.test(user.email);
    console.log("email flag", etest);
    const res = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
    // String@7
    const reset = res.test(user.password);
    
    if (!etest) {
      _errors.email = "Incorrect Email ";
      console.log("incorect email");
      console.log("email flag", etest);
    }
    if (!reset) {
      _errors.password = "Incorrect Password";
      console.log("incorect password");
    }
  
    setErrors(_errors);
    //form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    // console.log("check target", target.value);
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      console.log("invalid");
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
    

    axios({
      method: "post",
      url: "http://localhost:8000/user",
      headers: {
      //   Authorization: `Token ${accessToken}`,
      },
      data: user
    })
      .then((user) => {
      setUser(user.data);
      console.log("success", user.data)
      toast.success("Your account has been created")  
      navigate("/signin"); 
    })
      .catch((error) => {
        toast.error("Oops, please try again!")  
        console.log("error while signing up", error);
      });

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  helperText= "Please use gmail address"
                  {...()=>isError(errors)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  helperText="Password should contain digit,capital character,special character and should be more than 5characters"
                  {...()=>isError(errors)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box color="primary" mx="auto" pt={2}>
              {errordisplay}
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}