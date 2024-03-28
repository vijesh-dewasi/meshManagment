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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



export default function ForgoPassUniv() {

    const [showPassword,setShowPassword]=useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [helper,setHelper]=useState(false)
    
    const [email,setEmail]=useState("")
    const[otpBox,setOtpBox]=useState(false)
    const [otp,setOtp]=useState("")
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email')
    });
    // get the otp sent 
    setOtpBox(true)
  };
        

        const submitOtp=(e)=>{
            e.preventDefault();
            //verify otp and change password
            console.log(e.target.otp,e.target.email)
            setOtpBox(false)
        }
        const resendOtp=()=>{
            // get the otp again
            return;
        }
  

  return (
     <Box sx={{minWidth:'100vw',mb:'100px'}}>
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
            Forgot password 
          </Typography>
          </Stack>


          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
        
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type='email'
              autoComplete="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Change Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                    {"Sign Up"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      
      <Dialog
        open={otpBox}
        onClose={()=>{()=>{setOtpBox(false)}}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitOtp(e)}
        }}
      >


        <DialogContent sx={{maxWidth:'400px'}}>

          <DialogContentText>
          Enter the  new password and the otp sent to your email
          </DialogContentText>

        <Stack direction={'column'} gap={2}>

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
                <TextField               
                    inputProps={{ maxLength:6,minLength:6}}
                    margin="dense"
                    id="otp"
                    name="otp"
                    label="otp sent to email"
                    type="text"
                    helperText={helper?"pls enter number only":""}
                    variant="standard"
                    value={otp}
                    onChange={(e)=>{
                      const num=e.target.value;
                      if(/^\d+$/.test(num)){
                      setOtp(num)
                      }
                      else{
                      setOtp("")
                      setHelper(true);
                      }
                    }}
                />
                <Button onClick={(e)=>{resendOtp()}}>Resend Otp</Button>
            </Stack>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOtpBox(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>      

    </Box>
    
  );
}




