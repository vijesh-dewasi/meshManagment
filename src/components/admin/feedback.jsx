import {Paper,Box,Stack,Typography,Card,IconButton,Chip} from '@mui/material';
import React, { useState } from 'react'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Carousel from 'react-material-ui-carousel'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import { useFullScreenContext } from '../../fullScreenProvider';
import { useSnackContext } from '../../SnackProvider';

const Item=(props)=>{
   

    const src=props.src;

        return(
            <Paper>
                <Box
                    component="img"
                    sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 600,
                    overflow: 'hidden',
                    minWidth: '100%',
                    objectFit:"fill"
                    }}
                    src={src}
                    alt={"image of complaint"}
              />
            </Paper>
        )
}

const Feedback = (props) => {

    const theme = useTheme();
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();

    const [read,setRead]=useState(0);
    const {reason,imgSrc,mealTime,date,feedBackId}=props.data;
    const displayDate=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
    let imgFiles=[];

    const toggleFeed=()=>{

    if(imgFiles.length==0)
      {
       
      setFullScreen(true)

      const formData={
        univesityId:'mbm',
        meshNo:1,

      }
      const queryParams = new URLSearchParams(formData).toString();
      const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/feedbackPhoto?"+queryParams;    
            
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(response => {
        if (!response.ok) 
        throw new Error('Network response was not ok');
        const header = response.headers.get('Content-Disposition');
        const parts = header.split(';');
        const filename = parts[1].split('=')[1].replaceAll("\"", "");
        const blob = response.blob();
        return {blob,filename};
      })
      .then(data => {
            const {blob,filename}=data;
            if (blob != null) {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              a.remove();
          }
      })
      .catch(error => {
        console.error('Error:', error)
        setFullScreen(false)
        setRead(!read)
      })
    } 
    else
    setRead(!read)
    }

  return (
        <Box>
         <Stack gap={2} p={2} direction={"column"} component={Card}>


         {read?<Carousel
        //  navButtonsAlwaysVisible
         PrevIcon={<ArrowBackIosIcon/>}
         NextIcon={<ArrowForwardIosIcon/>}
         fullHeightHover={false}
         autoPlay={false}
         navButtonsProps={{
                 style: {
                        background:"none",
                        border:"none",
                        borderRadius:'none',
                        color:theme.palette.primary.main
                    }   
            }}


            activeIndicatorIconButtonProps={{
                    style: {
                   color:theme.palette.primary.main
                    }
            }}
         >
            {
            imgSrc.map( (src, i) => <Item key={i} src={src} /> )
            }
        </Carousel>:<></>}

            <Stack gap={1} direction={'row'}>
            <Chip color="primary" label={displayDate} variant="contained" />
            <Chip color="primary"  label={mealTime+' '+'meal'} variant="contained" />
            </Stack>
            
            <Typography>
            {read?reason:reason.slice(0,100)+'....'}
                <IconButton onClick={()=>{
                    toggleFeed()
                }} aria-label="expand-collapse" size="small">
                    {read?<KeyboardDoubleArrowUpIcon fontSize="small" />:<KeyboardDoubleArrowDownIcon fontSize="small" />}
                </IconButton>
            </Typography>
         </Stack>   
        </Box>
  )
}

export default Feedback