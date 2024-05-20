import {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert,InputAdornment,IconButton,Select,MenuItem,InputLabel,Stack,Snackbar} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackContext } from '../SnackProvider';
import { useFullScreenContext } from '../fullScreenProvider';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    
    const [showPassword,setShowPassword]=useState(false);
    const [showPassword2,setShowPassword2]=useState(false);
    const [mobile,setMobile]=useState("")
    const [role,setRole]=useState("Student");
    const [helper,setHelper]=useState(false);
    const [formData,setFormData] = useState({});

    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();
    

    const [otp,setOtp]=useState(false);
    const [emailOtp,setEmailOtp]=useState("");

    const[allowResend,setAllowResend]=useState(false)
    const[resendSecs,setResendSecs]=useState(0)
    const navigate=useNavigate();

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

      const submitOtp=(e)=>{
        e.preventDefault();
        setFullScreen(true)
        
        const queryParams = new URLSearchParams(formData).toString();
        console.log(queryParams)

            
        const otpCopy=formData.otp.trim();

                
             if(e.target.emailOtp.value==otpCopy){  
              
                setOtp(false)
                setSnack(
                  {
                    open:true,
                    msg:"your otp was correct now you can login",
                    severity:"success"
                  }   
                )
      
                const queryParams = new URLSearchParams(formData).toString();

                let roler = (formData.role=='Student'?"OTPValidationStudent?":"OTPValidationWarden?")
                if(formData.role=='Manager')
                roler="OTPValidationManager?" 

                const url ='http://'+import.meta.env.VITE_HOST + ":" + import.meta.env.VITE_PORT + "/UnifiedMess/"+roler+queryParams;    
                
                fetch(url, {
                  method: 'POST'
                })
                .then(response => {
                  if (!response.ok) 
                  throw new Error('Network response was not ok');
                  return response.text();
                })
                .then(data => {
                  console.log('Response:', data)
                  setFullScreen(false)
                  navigate('/login')
                  setOtp(false)
                })
                .catch(error => {
                  console.error('Error:', error)
                  setFullScreen(false)
                  setSnack({
                    open:true,
                    msg:"some error occured retry signup",
                    severity:"error"
                  })
                  setOtp(false)
                })
      
      
              }
              else{
                setSnack(
                  {
                    open:true,
                    msg:"your otp was incorrect pls retry",
                    severity:"error"
                  }   
                )
              }
              setFullScreen(false)
            

    }

    const resendOtp=()=>{
      setFullScreen(true)        
     

      const queryParams = new URLSearchParams(formData).toString();
      console.log(queryParams)
      


        let roler= (formData.role=='Student'?"SignUpStudent?":"SignUpWarden?")
        if(formData.role=='Manager')
        roler="SignUpManager?"
                
        const url ='http://'+import.meta.env.VITE_HOST + ":" + import.meta.env.VITE_PORT + "/UnifiedMess/"+roler+queryParams;    
        console.log(url)

      fetch(url, {
        method: 'POST',
      })
      .then(response => {
        if (!response.ok || response.status==404){
          throw new Error('Network response was not ok');
          return
        } 
        return response.text()
      })
      .then(data => {
        console.log('Response:', data)
        setFormData({...formData,otp:data});
        setFullScreen(false)
        if(!otp)
        setOtp(true)
        setAllowResend(false)
        setResendSecs(90)
      })
      .catch(error => {
        console.error('Error:', error)
        // setSnack({
        //   open:true,
        //   msg:"you are not registered contact your warden",
        //   severity:'error'
        // })
        setFullScreen(false)
        setAllowResend(false)
        setResendSecs(10)
      })              

    }

    
  
  const handleClose=()=>{
    setSnack({...snack,open:false})
  }

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
  
    
    if(data.get('role')=='Student'){
      setFormData({
        email: data.get('email'),
        password: data.get('password'),
        mobile:data.get('mobile'),
        roll_no:data.get('rollNo'),
        dob:data.get('dob'),
        confirm_password:data.get('password2'),
        role:data.get('role')
      })
    }
    else{
      setFormData({
        email: data.get('email'),
        password: data.get('password'),
        mobile:data.get('mobile'),
        confirm_password:data.get('password2'),
        role:data.get('role')
      })
    }
      
    resendOtp();
    // resendOtp();
  };



  return (
    <Box sx={{minWidth:'100%',mb:'100px'}}>   
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
            sign up
          </Typography>
          </Stack>


          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <InputLabel id="roleLabel">Role</InputLabel>
              <Select
                required
                fullWidth
                labelId="roleLabel"
                id="role"
                name='role'
                value={role}
                onChange={(e)=>(setRole(e.target.value))}
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Warden"}>Warden</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
              </Select>  
            </Grid>

              { role=='Student'?
                <>
                <Grid item xs={12}>
                <TextField
                  name="rollNo"
                  required
                  fullWidth
                  id="rollNo"
                  label="RollNo"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="dob"
                  name="dob"
                  disableFuture
                  label="Date of birth" 
                  />
              </Grid>
              </>
              :<></>
              }   

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
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="/login" variant="body2">
                  Sign in
                </Link>
              </Grid>
              <Grid item>
                <Link href="/forgotpass" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> 
      </Container>

       <Dialog
        open={otp}
        onClose={()=>{()=>{setOtp(false)}}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitOtp(e)}
        }}
      >

        <DialogTitle>Otp Verification</DialogTitle>

        <DialogContent>

          <DialogContentText>
           enter otp's sent on email
          </DialogContentText>

        <Stack direction={'column'} gap={2}>

                <TextField               
                    inputProps={{ maxLength:6,minLength:6}}
                    margin="dense"
                    id="emailOtp"
                    name="emailOtp"
                    label="otp on email"
                    type="text"
                    fullWidth
                    helperText={helper?"pls enter number only":""}
                    variant="standard"
                    value={emailOtp}
                    required
                    onChange={(e)=>{
                      const num=e.target.value;
                      if(/^\d+$/.test(num)){
                      setEmailOtp(num)
                      }
                      else{
                      setEmailOtp("")
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
          <Button onClick={()=>{setOtp(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>                   

    </Box>
  );
}