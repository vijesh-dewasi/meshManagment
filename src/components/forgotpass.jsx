import {useState,useEffect} from 'react';
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
import { useSnackContext } from '../SnackProvider';
import { useFullScreenContext } from '../fullScreenProvider';

export default function ForgoPass(){

    const [showPassword,setShowPassword]=useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [helper,setHelper]=useState(false)
    
    const [email,setEmail]=useState("")
    const[role,setRole]=useState("Student")

    const[otpBox,setOtpBox]=useState(false)
    const [otp,setOtp]=useState("")
    
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();
    
    const[allowResend,setAllowResend]=useState(false)
    const[resendSecs,setResendSecs]=useState(0)

    useEffect(
      ()=>{
        if(allowResend==true)
        return;
        const id=setTimeout(()=>{
           if(resendSecs>0){
              setResendSecs(resendSecs-1)
            }
            else{
              setAllowResend(true)
            }   
        },1000)
        return ()=>clearTimeout(id);
      },[resendSecs]
      )
        
      const handleSubmit = (event) => {
        event.preventDefault()
        resendOtp()    
      };
      

      const resendOtp=()=>{
        setFullScreen(true)        
        const formData={
        university_email: email,
        role:role
        }

        const queryParams = new URLSearchParams(formData).toString();
        console.log(queryParams)
        
        const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/forgotPassUniversity?"+queryParams;    
          console.log(url,import.meta.env.VITE_HOST,import.meta.env.VITE_PORT)

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(response => {
          if (!response.ok) 
          throw new Error('Network response was not ok');
          return response.json()
        })
        .then(data => {
          console.log('Response:', data)
          setFullScreen(false)
          if(!otpBox)
          setOtpBox(true)
          setAllowResend(false)
          setResendSecs(90)
        })
        .catch(error => {
          console.error('Error:', error)
          setFullScreen(false)
          if(!otpBox)
          setOtpBox(true)
          setAllowResend(false)
          setResendSecs(90)
        })              

      }


      const submitOtp=(e)=>{
          e.preventDefault();
          setFullScreen(true)
          const formData = {
              email:email,
              otp:e.target.otp.value,
              password:e.target.password.value,
              role:role
          }
          const queryParams = new URLSearchParams(formData).toString();
          console.log(queryParams)
  
              const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/submitForgotPass?"+queryParams;    
              
              fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              })
              .then(response => {
                if (!response.ok) 
                throw new Error('Network response was not ok');
                return response.json()
              })
              .then(data => {
                console.log('Response:', data)
                setFullScreen(false)
                setOtpBox(false)
              })
              .catch(error => {
                console.error('Error:', error)
                setFullScreen(false)
                setOtpBox(false)
              })
      }
       
  

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
            Forgot password 
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
                value={role}
                onChange={(e)=>setRole(e.target.value)}
            >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Admin"}>warden</MenuItem>
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
                <Button 
                disabled={!allowResend} 
                onClick={(e)=>{resendOtp()}}
                >
                {allowResend?"Resend Otp":`Resend otp in ${resendSecs} secs`}
                </Button>
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




