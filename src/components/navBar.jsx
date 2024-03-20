import {useState} from 'react';
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



function NavBar(props){

  const role=props.role;
  const fullName="mahesh meena"
  const rollNo="21UCSE87"
  const Dob=new Date();
  const [mobile,setMobile]=useState("9772316533")
  const [email,setEmail]=useState("mohitdewasi420@gmail.com")
  const branch="cse"
  const mesh_id="ghij"
  const session="2023-2024"
  const university="MBM"
  
  const [helper,setHelper]=useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const [profile,setprofile]=useState(false);
  const [otp,setOtp]=useState(false);

  const [otp1,setOtp1]=useState("");
  const [otp2,setOtp2]=useState("");

  const submitProfile=(e)=>{
    e.preventDefault();
    console.log(e.target.mobile.value,e.target.email.value)
    setprofile(false);
    setOtp(true)
  }
  const handleProfile =(e)=>{setprofile(true)}

  const submitOtp=(e)=>{
    e.preventDefault();
    console.log(e.target.oldOtp.value,e.target.newOtp.value)
    setOtp(false)
  }
  const resendOtp=()=>{
    return;
  }
  
  const handleLogout =(e)=>{
    return; 
  }

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

          <Grid container direction="row" gap={2} item xs justifyContent="flex-end">
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

      <Dialog
        open={profile}
        onClose={()=>{setprofile(true)}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitProfile(e)}
        }}
      >

        <DialogTitle>Your profile</DialogTitle>

        <DialogContent>

          <DialogContentText>
           {role==='student'?
           "you can edit Mobile Email only for other you can contact the warden" :'you can edit your mobile and email'}
          </DialogContentText>

        <Stack direction={'column'} gap={2}>

                  <TextField
                    inputProps={{ maxLength: 25}}               
                    margin="dense"
                    id="fullName"
                    name="fullName"
                    label={role==='univ'?'Insttitute Name':"Full Name"}
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={fullName}
                    disabled
                />

                {role==='student'?
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
                    defaultValue={rollNo}
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
                    defaultValue={mesh_id}
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
                    defaultValue={session}
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
                    defaultValue={university}
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
                    defaultValue={branch}
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
                    variant="standard"
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

                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setprofile(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog> 

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
                <Button onClick={(e)=>{resendOtp()}}>Resend Otp</Button>

            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOtp(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>    

    </AppBar>
  );
}
export default NavBar;