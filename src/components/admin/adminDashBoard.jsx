import React from 'react'
import NavBar from '../navBar.jsx';
import TodayMenu from '../todayMenu.jsx';
import Stats from '../stats.jsx';
import {Grid,Stack} from '@mui/material';
import FeedbackViewer from './FeedbackViewer.jsx';
import UploadFood from './uploadFood.jsx';
import Students from './students.jsx'; 
import Attendance from './attendance.jsx';
import OptOut from './optOut.jsx';

const AdminDashBoard = () => {
  return (
    <>
    <NavBar role={'admin'}/>

    <Grid sx={{my:15,minWidth:'100%'}} container gap={2} justifyContent={'space-around'} alignItems={'flex-start'}>
          
          <Grid item xs={12} sm md={4} lg={5} alignSelf={'flex-start'}>
          
          <Stack direction={'column'}>
          <TodayMenu></TodayMenu>
          <Stats></Stats>
          </Stack>

          </Grid>
          
          <Grid item xs={12} sm md={6} lg={6}  justifySelf='center' alignSelf={'center'}>
          
          <Stack direction={'column'} gap={2}>
          <Stack px={{xs:6}} justifyContent='center' direction={{xs:'column',md:'row'}} gap={{lg:2,xs:2,md:0.5}}>
          <UploadFood></UploadFood>   
          <Students></Students>
          <Attendance></Attendance>
          <OptOut></OptOut>
          </Stack>
          <FeedbackViewer></FeedbackViewer>
          </Stack>

          </Grid>


        </Grid>
    </>
  )
}

export default AdminDashBoard