import React from 'react'
import { CircularProgress } from '@mui/material'
import {useFullScreenContext} from '../fullScreenProvider'
import {Box} from '@mui/material'

const FullScreenLoad = () => {
  const {fullScreen,setFullScreen}=useFullScreenContext();

  return (
    fullScreen?
    <>
    <Box sx={
      {position:"fixed",
      top:0,
      left:0,
      width:"100vw",
      height:"100%",
      backgroundColor:"rgba(0,0,0,0.5)",
      zIndex:9999,
      display:"flex",
      justifyContent:"center",
      alignItems:"center"}
      }>
      <CircularProgress color="primary" />
    </Box>
    </>
    :
    <></>
  )
}

export default FullScreenLoad