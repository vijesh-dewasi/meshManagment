import React from 'react'
import NavBar from './navBar';
import FullMonth from "./FullMonth.jsx"
import TodayMenu from './todayMenu.jsx';
import Stats from './stats.jsx';
import ActionButtons from './actionButtons.jsx';
import { Grid} from '@mui/material';

const UserDashBoard = () => {


  return (
        <>
        <NavBar role={'student'}></NavBar>

        <Grid sx={{my:15,minWidth:'100%'}} container gap={2} justifyContent={'center'} alignItems={'center'}>

          <Grid container item xs={12} md={6} lg={4} alignSelf={'flex-start'}>

          <Grid item xs={12}  alignSelf={'flex-start'}>
          <FullMonth></FullMonth> 
          </Grid>

          <Grid container item xs={12} alignSelf={'flex-start'} justifyContent={'center'}>
          <ActionButtons></ActionButtons>
          </Grid>

           </Grid> 


           <Grid item xs={12} md={6} lg={3} alignSelf={'flex-start'}>
          <TodayMenu></TodayMenu>
          </Grid>

          <Grid item xs={12} md={6} lg={4} alignSelf={'flex-start'}>
          <Stats></Stats>
          </Grid> 
           

        </Grid>
        </>
  )
}

export default UserDashBoard