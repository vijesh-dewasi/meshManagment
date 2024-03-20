import {Paper,Box,Stack,Typography,Card,IconButton,Chip} from '@mui/material';
import React, { useState } from 'react'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Carousel from 'react-material-ui-carousel'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';

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

    const [read,setRead]=useState(0);
    const {reason,imgSrc,mealTime,date}=props.data;
    const displayDate=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
    // console.log(reason,imgSrc,mealTime,date)

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
                <IconButton onClick={()=>{setRead(!read)}} aria-label="expand-collapse" size="small">
                    {read?<KeyboardDoubleArrowUpIcon fontSize="small" />:<KeyboardDoubleArrowDownIcon fontSize="small" />}
                </IconButton>
            </Typography>
         </Stack>   
        </Box>
  )
}

export default Feedback