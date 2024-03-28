import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert,InputAdornment,IconButton,Stack,Snackbar} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSnackContext } from '../../SnackProvider';
import { useFullScreenContext } from '../../fullScreenProvider';

const UnivSignUp = () => {
  
    const [showPassword,setShowPassword]=useState(false);
    const [showPassword2,setShowPassword2]=useState(false);
    
    const [mobile,setMobile]=useState("")
    const [helper,setHelper]=useState(false);
    
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const password2 = data.get('password2');
    if(password!==password2){
      setSnack({open:true,msg:"pls set the same password in both fields",severity:"error"})
      return
    }
    if(password.length<8){
      setSnack({open:true,msg:"password must be at least 8 character long",severity:"error"})
      return
    }
    if(!/[A-Z]/.test(password)){
      setSnack({open:true,msg:"password must contain at least one capital letter",severity:"error"})
      return
    }
    if(!/[0-9]/.test(password)){
      setSnack({open:true,msg:"password must contain at least one numerical",severity:"error"})
      return
    }
    if(!/[!@#$%^&*]/.test(password)){
      setSnack({open:true,msg:"password must contain at least one special character",severity:"error"})
      return
    }

    setFullScreen(true);
    setTimeout(()=>{setFullScreen(false)},10000);
    
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      univName:data.get('univName'),
      mobile:data.get('mobile'),
      password2:data.get('password2')
    });

  };



  return (
    <Box sx={{minWidth:'100%',mb:'100px',mx:'auto'}}>    
      <Container component="main" maxWidth="xs">
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
           Institute sign up
          </Typography>
          </Stack>


          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
            
                <Grid item xs={12}>
                <TextField
                  name="univName"
                  required
                  fullWidth
                  type='text'
                  id="univName"
                  label="University Name"
                  autoFocus
                />
                </Grid>     

              <Grid item xs={12}>

              <TextField
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword?'text':'password'}
                  id="password"
                  autoComplete="new-password"
                  
                  InputProps={{ // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setShowPassword(!showPassword)}}
                                onMouseDown={()=>{setShowPassword(!showPassword)}}
                              >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  helperText="At least 8 character long with at least one special character,numerical,capital letter"
                  name="password2"
                  label="re-enter Password"
                  type={showPassword2?'text':'password'}
                  id="password2"
                  autoComplete="new-password"
                  InputProps={{ // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setShowPassword2(!showPassword2)}}
                                onMouseDown={()=>{setShowPassword2(!showPassword2)}}
                              >
                                {showPassword2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> 
      </Container>
      
    </Box>)
}

export default UnivSignUp