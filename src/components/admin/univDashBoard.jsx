import NavBar from '../navBar.jsx';
import TodayMenu from '../todayMenu.jsx';
import Stats from '../stats.jsx';
import FeedbackViewer from './FeedbackViewer.jsx';
import Attendance from './attendance.jsx';
import OptOut from './optOut.jsx';
import Meshes from './meshes.jsx';
import { Grid, Stack } from '@mui/material';
import UploadFood from './uploadFood.jsx';
import Students from './students.jsx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { useFullScreenContext } from '../../fullScreenProvider';
import { useSnackContext } from '../../SnackProvider';
import { useAuthContext } from '../../authContextProvider';
import { useNavigate } from 'react-router-dom';

const UnivDashBoard = () => {


  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();
  const {auth, setAuth}=useAuthContext();
  
  const [meshes,setMeshes] = useState([]);
  const [mesh, setMesh] = useState('MU3');
  const [open, setOpen] = useState(false);

  const navigate=useNavigate();

  useEffect(() => {

      const formData={
        university_email:auth.email?auth.email:'gvijeshkumar@gmail.com'
      }
        setFullScreen(true)

        const queryParams = new URLSearchParams(formData).toString();
        
        const url ='http://'+ import.meta.env.VITE_HOST + ':'+import.meta.env.VITE_PORT + "/UnifiedMess/GetMessDetails?" + queryParams;    
        
            fetch(url, {
              method: 'GET'
            })
            .then(response => {
              if (!response.ok) 
              throw new Error('Network response was not ok');
              return response.json()
            })
            .then(data => {
              console.log('Response:', data)
              setMeshes(data)
              setMesh(data[0].messId)
              setFullScreen(false)
            })
            .catch(error => {
              console.error('Error:', error)
              setSnack({
                  open:true,
                  msg:'there was problem in loading',
                  severity:'error'
              })
              setFullScreen(false)
            })

  },[])

 

  const handleChange = (event) => {
    setMesh(event.target.value);
  }

  const handleClose = () => {setOpen(false)}
  const handleOpen = () => {setOpen(true)}

  return(
  <>
    <NavBar role={'University'}/>

    <Grid sx={{my:15,minWidth:'100%'}} container gap={2} justifyContent={'space-around'} alignItems={'flex-start'}>
          
    <Grid item xs={12} >
                <Stack mb={4} direction={{xs:'column',md:'row'}} gap={2} justifyContent={'center'} alignItems={'center'}>
                <InputLabel id="meshs">Viewing Mesh No</InputLabel>
                <Select
                labelId="meshs"
                id="meshSelect"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={mesh}
                label="viewing Mesh No"
                onChange={handleChange}
              >
                {meshes.map((mesh,i) =>{
                  return <MenuItem key={i} value={mesh.messId}>{mesh.messId}</MenuItem>
                })}

              </Select>
              </Stack>
          </Grid>


          <Grid item xs={12} sm md={4} lg={5} alignSelf={'flex-start'}>
          <Stack direction={'column'}>

          <TodayMenu mesh={mesh} ></TodayMenu>
          <Stats mesh={mesh} role='University' ></Stats>

          </Stack>
          </Grid>
          

          <Grid item xs={12} sm md={6} lg={6}  justifySelf='center' alignSelf={'flex-start'}>
          
          {/* <Stack  direction={'column'} gap={2}>
          <Stack px={{xs:6}}  justifyContent='center' direction={{xs:'column',md:'row'}} gap={{lg:2,xs:2,md:0.5}}>
              <Meshes ></Meshes>
              <Attendance mesh={mesh}></Attendance>
          </Stack>
          <FeedbackViewer mesh={mesh}></FeedbackViewer>
          </Stack> */}

          </Grid>
        </Grid>
    </>
    )

}

export default UnivDashBoard
    
 