import {useEffect, useState} from 'react'
import ActionButtons from '../actionButtons'
import {Grid,Container,Typography, Paper,Card} from '@mui/material'
import Feedback from './feedback'
import { useFullScreenContext } from '../../fullScreenProvider';
import { useSnackContext } from '../../SnackProvider';
import '../../slideBar.css'

const data=[
            {
             reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:1
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:2
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:[],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:3
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:4
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:5
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f3.jpg'],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:6
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f3.jpg'],
             mealTime:'LUNCH',
             date:new Date(),
             feedbackId:7
            }
        ]

const FeedbackViewer = (props) => {

  const messId=props.mesh;
  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();
  

    useEffect(()=>{
      setFullScreen(true)
      const formData={
       messId:messId
      }
      const queryParams = new URLSearchParams(formData).toString();
        const url='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/feedbacks?"+queryParams
      fetch(url,{
        method:'GET'
      }).then(response=>{

        if(!response.ok) throw new Error('Network response was not ok')
        return response.json()
      
      }).then(feed=>{
        console.log('Response:',feed)
        feed.feedbacks.forEach((x)=>{
          data.push(x)
        })
        setFullScreen(false)
      }).catch(error=>{
        console.error('Error:',error)
        setFullScreen(false)
      })

    },[])

  return (
  
    <Container component={Paper} sx={{paddingTop:'10px',paddingBottom:'25px'}} elevation={3} >

       <Typography variant={'h6'} mb={2}>
        This weeks Feed back's
       </Typography> 

        <Grid container gap={1} 
        sx={{
          overflowY:'auto',
          overflowX:'hidden',
          height:'400px',
        }}
        className='slideBar'
        >
    {data.map((d,i)=>(
         <Grid item>
        <Feedback key={i} data={d}></Feedback>
         </Grid>  
    ))}
        </Grid>

    </Container>

  )
}

export default FeedbackViewer