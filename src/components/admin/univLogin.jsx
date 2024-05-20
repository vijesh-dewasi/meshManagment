import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {InputAdornment,IconButton,Select ,Menu,MenuItem,InputLabel,Stack} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSnackContext } from '../../SnackProvider';
import { useFullScreenContext } from '../../fullScreenProvider';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../authContextProvider';

export default function UnivLogin() {

    const navigate= useNavigate();
    const {auth,setAuth}=useAuthContext()

    const [showPassword,setShowPassword]=useState(false);
    const [mobile,setMobile]=useState("")
    const [email,setEmail]=useState("")
    const [helper,setHelper]=useState(false);

    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();
    

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFullScreen(true)
    const formData={
      university_email: data.get('email'),
      password: data.get('password')
    }

    const queryParams = new URLSearchParams(formData).toString();
    console.log(queryParams)
    
    const url ='http://'+ import.meta.env.VITE_HOST+ ":" + import.meta.env.VITE_PORT + "/UnifiedMess/SignInUniversity?" +queryParams;    
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
      setSnack(
        {
          open:true,
          msg:"login successful",
          severity:"success"
      })
      setFullScreen(false)
      console.log(data);
      setAuth({email:formData.university_email,role:"University",name:data.name,mobile:data.universityMobile});
      navigate('/univdashboard')
    })
    .catch(error => {
      console.error('Error:', error)
      setSnack(
        {
          open:true,
          msg:"incorrect password",
          severity:"error"
      })
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
            Institute Sign In 
          </Typography>
          </Stack>


          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
           
          {/* <TextField
                    margin="dense"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    required
                    inputProps={{ maxLength:10,minLength:10}}
                    value={mobile}
                    helperText={helper?"pls enter number only":""}
                    onChange={(e)=>{
                      const num=e.target.value;
                      if(/^\d+$/.test(num)){
                      setMobile(num)
                      }
                      else{
                      setMobile("")
                      setHelper(true);
                      }
                    }}
                /> */}

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
                <Link href="/forgotpassinst" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/instsignup" variant="body2">
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