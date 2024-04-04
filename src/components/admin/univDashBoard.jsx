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


const UnivDashBoard = () => {
  
  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();

  const [meshes,setMeshes] = useState(['Mesh 1','Mesh 2','Mesh 3','Mesh 4','Mesh 5','Mesh 6','Mesh 7','Mesh 8','Mesh 9','Mesh 10']);
  const [mesh, setMesh] = useState('select mesh');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    
      const formData={
        univName: 'IIT Khar',
        univemail:'univmail@cmk.com'
      }
        setFullScreen(true)

        const queryParams = new URLSearchParams(formData).toString();
        
        const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/meshList?"+queryParams;    
            
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
              setFullScreen(false)
            })
            .catch(error => {
              console.error('Error:', error)
              setMeshes(['Mesh 1','Mesh 2','Mesh 3','Mesh 4','Mesh 5','Mesh 6','Mesh 7','Mesh 8','Mesh 9','Mesh 10']);
              setMesh(meshes[0])
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
    <NavBar role={'univ'}/>

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
                  return <MenuItem key={i} value={mesh}>{mesh}</MenuItem>
                })}

              </Select>
              </Stack>
          </Grid>


          <Grid item xs={12} sm md={4} lg={5} alignSelf={'flex-start'}>
          <Stack direction={'column'}>
          <TodayMenu></TodayMenu>
          <Stats></Stats>
          </Stack>
          </Grid>
          

          <Grid item xs={12} sm md={6} lg={6}  justifySelf='center' alignSelf={'flex-start'}>
          
          <Stack  direction={'column'} gap={2}>
          <Stack px={{xs:6}}  justifyContent='center' direction={{xs:'column',md:'row'}} gap={{lg:2,xs:2,md:0.5}}>
              <Meshes></Meshes>
              <Students></Students>
              <Attendance></Attendance>
          </Stack>
          <FeedbackViewer></FeedbackViewer>
          </Stack>

          </Grid>
        </Grid>
    </>
    )

}

export default UnivDashBoard
    
 