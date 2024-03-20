import {useState} from 'react'
import ActionButtons from '../actionButtons'
import {Grid,Container,Typography} from '@mui/material'
import Feedback from './feedback'


const data=[
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'Morning',
             date:new Date()
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'Morning',
             date:new Date()
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:[],
             mealTime:'Morning',
             date:new Date()
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'Morning',
             date:new Date()
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f2.jpg','/f3.jpg'],
             mealTime:'Morning',
             date:new Date()
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f3.jpg'],
             mealTime:'Morning',
             date:new Date()
            },
            {reason:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt dolor in libero dictum, sit amet bibendum risus porta. Phasellus consequat mauris bibendum urna lacinia efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus viverra mi non nunc placerat eleifend. Pellentesque ligula quam, porta condimentum risus et, tincidunt interdum massa. Praesent at justo eget turpis blandit rhoncus. Nulla tincidunt dictum facilisis. Sed varius ipsum nulla, a pulvinar felis mattis id. Donec ut tempor velit. Sed nibh urna, fermentum id tincidunt convallis, viverra sit amet ligula.',
             imgSrc:['/f1.jpeg','/f3.jpg'],
             mealTime:'Morning',
             date:new Date()
            }
        ]

const FeedbackViewer = () => {
  return (
  
    <Container>

       <Typography variant={'h6'} mb={2}>
        This weeks Feed back's
       </Typography> 

        <Grid container gap={1}>
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