import {useState} from 'react';
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
import {InputAdornment,IconButton,Select ,Menu,MenuItem,InputLabel,Stack} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSnackContext } from '../SnackProvider';
import { useFullScreenContext } from '../fullScreenProvider';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../authContextProvider';

export default function SignIn() {

    const [showPassword,setShowPassword]=useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const [helper,setHelper]=useState(false)
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();
    const navigate=useNavigate();
    const {auth, setAuth}=useAuthContext();
    

  const handleSubmit = (event) => {
    event.preventDefault();
    setSnack({
      open:true,
      msg:'welcome to the portal',
      severity:'success'
    })

    
    setFullScreen(true)
    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get('email'),
      password: data.get('password'),
      role:data.get('role')
    }
    
      

    const queryParams = new URLSearchParams(formData).toString();
    console.log(queryParams)
    
    const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/SignIn?"+queryParams;    
    console.log(url,import.meta.env.VITE_HOST,import.meta.env.VITE_PORT)

    fetch(url, {
      method: 'POST'
    })
    .then(response => {
      if (!response.ok) 
      throw new Error('Network response was not ok');
      return response.json()
    })
    .then(data => {
      console.log('Response:', data)
      setAuth({
        email:formData.email,
        role:formData.role,
        messId: data.mess_Id?data.mess_Id:'MBMUJ',
        name: data.fullName,
        university: data.university_Id,
        branch:data.branch,
        rollNo:data.rollNo
        })
      setFullScreen(false)

        if(formData.role=='Student')
        navigate('/userdashboard')
        else
        navigate('/admindashboard')
    })
    .catch(error => {

      console.error('Error:', error)

      setSnack({
        open:true,
        msg:'Invalid Credentials',
        severity:'error'
      })

        // if(formData.role=='Student')
        // navigate('/userdashboard')
        // else
        // navigate('/admindashboard')

      setFullScreen(false)
    })

  };

  return (
     <Box sx={{minWidth:'100%',mb:'100px'}}>
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
          

            <Avatar
            alt="MBM_LOGO"
            src="../public/MBM_LOGO.png"
            sx={{ width:80, height:80,m:2}}
            />


          <Stack direction="row" spacing={1} alignItems={"center"}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          </Stack>


          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
           
            <InputLabel id="roleLabel">Role</InputLabel>
            <Select
                required
                fullWidth
                labelId="roleLabel"
                id="role"
                name='role'
                defaultValue={"Student"}
            >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Warden"}>Warden</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
            </Select>
            
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type='email'
              autoComplete="email"
              autoFocus
            />
            <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword?'text':'password'}
                  id="password"
                  autoComplete="new-password"
                  helperText="At least 8 character long with at least one special character,numerical,capital letter"
                  InputProps={{ // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                />

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpass" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
    
  );
}