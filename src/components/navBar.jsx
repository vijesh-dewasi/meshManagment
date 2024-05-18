import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { Grid,Stack} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFullScreenContext } from '../fullScreenProvider';
import { useSnackContext } from '../SnackProvider';
import DarkModeBtn from './darkMode';


function Profile(props){
  
  const {profile,setProfile,role}=props;

  const [edit,setEdit]=useState(false)
  const {snack,setSnack}=useSnackContext()
  const {fullScreen,setFullScreen}=useFullScreenContext()

  const [mobile,setMobile]=useState("9772316533")
  const [email,setEmail]=useState("mohitdewasi420@gmail.com")
  
  const [profileDetails,setProfileDetails]=useState({}) 
  const [originalDetails,setOriginalDetails]=useState({})
  
  const [helper,setHelper]=useState(false) 
  
  const [otp,setOtp]=useState(false)
  
        useEffect(()=>{

              const formData={
                role:role,
                email:email
              }
            
            setFullScreen(true)

            const queryParams = new URLSearchParams(formData).toString();
            
            const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/getProfileDetails?"+queryParams;    
                
                fetch(url, {
                  method: 'GET',
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
                  setProfileDetails(data.otherDetails)
                  setOriginalDetails({...data.otherDetails,mobile:mobile,email:email})
                  setMobile(data.mobile)
                  setEmail(data.email)
                  setFullScreen(false)
                })
                .catch(error => {
                  console.error('Error:', error)
                  const data={
                    fullName:"mahesh meena",
                    role:role,
                    university:"MBM",
                    branch:"cse",
                    session:"2023-2024",
                    rollNo:"21UCSE87",
                    mesh_id:"ghij",
                    Dob:new Date()
                  };
                  setProfileDetails(data)
                  setMobile("5472316533")
                  setEmail("dfkjd@kdjf.com")
                  setOriginalDetails({...data,mobile:mobile,email:email})
                  setFullScreen(false)
                })
        },[])

        
        const submitProfile=(e)=>{
           e.preventDefault(); 
           setProfile(false)
           setOtp(true) 
        }
  
  return(
    <>
    <Dialog
        open={profile}
        onClose={()=>{setProfile(false)}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitProfile(e)}
        }}
       
      >

        <DialogTitle>Your profile</DialogTitle>

        <DialogContent sx={{
          minWidth:'300px'
          }}>

          {edit?<DialogContentText>
           {profileDetails.role==='student'?"you can edit Mobile Email only for other you can contact the warden" :'you can edit your mobile and email'}
          </DialogContentText>:<></>}

        <Stack direction={'column'} gap={2}>

                  <TextField
                    inputProps={{ maxLength: 25}}               
                    margin="dense"
                    id="fullName"
                    name="fullName"
                    label={profileDetails.role==='univ'?'Insttitute Name':"Full Name"}
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={profileDetails.fullName}
                    disabled
                />

                {profileDetails.role==='student'?
                <>
                

                <TextField
                    inputProps={{ maxLength: 25}}
                    margin="dense"
                    id="rollNO"
                    name="rollNO"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={profileDetails.rollNo}
                    disabled
                />
                
                <TextField
                    inputProps={{ maxLength: 10}}
                    margin="dense"
                    id="mesh"
                    name="mesh"
                    label="Mesh"
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={profileDetails.mesh_id}
                    disabled
                />

                <TextField
                    inputProps={{ maxLength:10}}
                    margin="dense"
                    id="session"
                    name="session"
                    label="session"
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={profileDetails.session}
                    disabled
                />

                  <TextField
                    inputProps={{ maxLength: 35}}
                    margin="dense"
                    id="university"
                    name="university"
                    label="Institution"
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={profileDetails.university}
                    disabled
                />

                  <TextField
                    inputProps={{ maxLength:15}}
                    margin="dense"
                    id="Branch"
                    name="Branch"
                    label="Branch"
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={profileDetails.branch}
                    disabled
                />
                </>:<></>}

                <TextField
                    margin="dense"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    disabled={!edit}
                    variant={edit?"standard":"filled"}
                    inputProps={{ maxLength:10,minLength:10}}
                    value={mobile}
                    helperText={helper?"pls enter number only":""}
                    onChange={(e)=>{
                      const num=e.target.value;
                      if(/^\d+$/.test(num)){setMobile(num)}
                      else{
                      setMobile("")
                      setHelper(true);
                      }
                    }}
                />

                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    disabled={!edit}
                    variant={edit?"standard":"filled"}
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
          
          {edit?
          <Button key={'profileSubmitBtn'} type="submit">Submit</Button>:
          <Button key={'profileEditBtn'} onClick={()=>{setEdit(true)}}>Edit</Button>}
          <Button key={'profileCancelBtn'} 
                  onClick={
                      ()=>{
                    setProfile(false)
                    setEdit(false)
                  }}>Cancel</Button>

        </DialogActions>
      </Dialog>
      <OtpBox otp={otp} setOtp={setOtp} role={role} AllProfileDetails={{...profileDetails,mobile:mobile,email:email}} originalDetails={originalDetails}></OtpBox>
      </>

  )
}

function OtpBox(props){
         
        const {otp,setOtp,role,AllProfileDetails,originalDetails}=props;  

        const [otp1,setOtp1]=useState("");
        const [otp2,setOtp2]=useState("");
        const [helper,setHelper]=useState(false);

        const {snack,setSnack}=useSnackContext();
        const {fullScreen,setFullScreen}=useFullScreenContext();

        const[allowResend,setAllowResend]=useState(false) 
        const[resendSecs,setResendSecs]=useState(0)
        
        const sendOtp=(e)=>{
          
          if(e)
          e.preventDefault()

              const formData={
                older:{...originalDetails},
                new:{...AllProfileDetails}
              }
          setFullScreen(true)
      
            const queryParams = new URLSearchParams(formData).toString();
          
        
            const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/sendOtp?"+queryParams;    
          
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
              setAllowResend(false)
              setResendSecs(90)
              setFullScreen(false)
            })
            .catch(error => {
              console.error('Error:', error)
              setAllowResend(false)
              setResendSecs(10)
              setFullScreen(false)
            })
        }

      const submitOtp=(e)=>{

         e.preventDefault()
        const formData={
          older:{...originalDetails},
          new:{...AllProfileDetails},
          oldOtp:otp1,
          newOtp:otp2
        }
        setFullScreen(true)

        const queryParams = new URLSearchParams(formData).toString();
        
        const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/submitOtp?"+queryParams;    
            
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
            })
            .catch(error => {
              console.error('Error:', error)
              setFullScreen(false)
              setOtp(false)
            })
        
          }

  
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
            },[resendSecs])

            useEffect(
              ()=>{sendOtp()}
            ,[])

  return(
            <Dialog
            open={otp}
            onClose={()=>{()=>{setOtp(false)}}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitOtp(e)}
            }}
          >

            <DialogTitle>Otp for contact detail change</DialogTitle>

            <DialogContent>

              <DialogContentText>
              To proceed to with changing your Mobile or Email
              enter otp's sent on both new and older mobile Email.
              </DialogContentText>

            <Stack direction={'column'} gap={2}>

                    <TextField               
                        inputProps={{ maxLength:6,minLength:6}}
                        margin="dense"
                        id="oldOtp"
                        name="oldOtp"
                        label="otp sent to previous mobile email"
                        type="text"
                        fullWidth
                        helperText={helper?"pls enter number only":""}
                        variant="standard"
                        value={otp1}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setOtp1(num)
                          }
                          else{
                          setOtp1("")
                          setHelper(true);
                          }
                        }}
                    />
                    <TextField               
                        inputProps={{ maxLength:6,minLength:6}}
                        margin="dense"
                        id="newOtp"
                        name="newOtp"
                        label="otp sent to new mobile email"
                        type="text"
                        fullWidth
                        helperText={helper?"pls enter number only":""}
                        variant="standard"
                        value={otp2}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setOtp2(num)
                          }
                          else{
                          setOtp2("")
                          setHelper(true);
                          }
                        }}
                    />

                    <Button 
                    key='resendOtpBtn'
                    disabled={!allowResend} 
                    onClick={(e)=>{sendOtp(e)}}
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
)}

function NavBar(props){
  
  const role=props.role;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const [profile,setProfile]=useState(false);
  

  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();

  
  
  
 
  const handleLogout =(e)=>{
     
    const formData={
      mobile:'9565512345',
      email:'jdfh@kdk.com',
      role:role
    }
      setFullScreen(true)

      const queryParams = new URLSearchParams(formData).toString();
      
      const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/logout?"+queryParams;    
          
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
          })
          .catch(error => {
            console.error('Error:', error)
            setFullScreen(false)
          })

          return;  
  }
  const handleProfile =(e)=>{setProfile(true)}
  const handleClick = (event) =>{setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}

  

  return (
    <AppBar elevation={6} sx={{
        position:'fixed'
    }}>
      <Toolbar sx={{ height:{xs:80,md:100} }} >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
          <Grid container item xs={1}>
          <Avatar sx={{ width:{xs:60,md:80}, height:{xs:60,md:80} }} alt="MBM LOGO" src="/public/MBM_LOGO.png" />
          </Grid>

          <Grid container direction="row" gap={2} item xs alignItems={'center'} justifyContent="flex-end">
          <Grid item >
            <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width:50, height:50}}>M</Avatar>
            </IconButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Toggle Color Mode">
               <DarkModeBtn></DarkModeBtn>
            </Tooltip>
          </Grid>
          
          </Grid>

      </Grid>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}    
        sx={{
            overflow:'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            }
          }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Profile profile={profile} setProfile={setProfile} role={role}/>
          
    </AppBar>
  );
}
export default NavBar;