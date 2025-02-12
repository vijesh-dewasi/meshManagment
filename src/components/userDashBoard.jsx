import React from 'react'
import NavBar from './navBar';
import FullMonth from "./FullMonth.jsx"
import TodayMenu from './todayMenu.jsx';
import Stats from './stats.jsx';
import ActionButtons from './actionButtons.jsx';
import { Grid} from '@mui/material';
import { useAuthContext } from '../authContextProvider';
import {Footer} from '../footer';

const UserDashBoard = () => {

  const {auth,setAuth}=useAuthContext();

  if(!auth.email)
    auth.email='maheshme2002@gmail.com'
  if(!auth.messId)
    auth.messId='MBMUJ'

  return (
        <>
        <NavBar role={'Student'}></NavBar>

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
          <TodayMenu mesh={auth.meshId}></TodayMenu>
          </Grid>

          <Grid item xs={12} md={6} lg={4} alignSelf={'flex-start'}>
          <Stats student_Email={auth.email} mess={auth.messId} role='Student'></Stats>
          </Grid> 
           

        </Grid>

        <Footer></Footer>
        </>
  )
}

export default UserDashBoard