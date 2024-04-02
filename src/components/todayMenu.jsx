import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Card,Stack,IconButton} from '@mui/material';
import {Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from 'react';
import { useFullScreenContext } from '../fullScreenProvider';
import { useSnackContext } from '../SnackProvider';  

function createData(mealTime,items,rating){
  return {mealTime,items,rating};
}

const rows = [
  createData('Morning',["rice","daal","roti","sabji","dahi","salad"],4.5),
  createData('Afternoon',["rice","daal","roti","sabji","dahi","salad"],4.5)
];



const TodayMenu = () => {
  const [view,setView]=useState(true)

  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();
  
  useEffect(()=>{
        setFullScreen(true)
        const formData={
          mesh:3,
          university:'MBM',
          studentRoll:'21ucse5542'
        }
        const queryParams = new URLSearchParams(formData).toString();
        
        const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/todayMenu?"+queryParams;    
            
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
              data.menu.forEach((x)=>{
                rows.push(x)
              })
              setFullScreen(false)
            })
            .catch(error => {
              console.error('Error:', error)
              setFullScreen(false)
            })
  },[])

  return (

    <Stack sx={{minWidth:{xs:300}}} direction={'column'} alignItems={'center'}>
    
      <Stack alignItems={'center'} direction={'row'} gap={1}>
          <Typography variant='h6' >
              Today's Menu
            </Typography>
            <IconButton sx={{width:20,height:20,mr:1,background:'none',color:'primary.light'}} onClick={()=>(setView(!view))}>
            {view?<KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
            </IconButton>
            </Stack> 
            {
          view?
    <TableContainer >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key={'col1'}><Typography>Meal time</Typography></TableCell>
            <TableCell key={'col2'}>Food list</TableCell>
            <TableCell key={'col3'}>Rating</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell key={'head'} component="th" scope="row">
                {row.mealTime}
              </TableCell>

              <TableCell key={'mid'} >

                <List dense disablePadding>
                    {row.items.map((i)=>
                     (<ListItem key={i} disableGutters>  
                      <Avatar sx={{width:20,height:20,mr:1,background:'none',color:'primary.light'}}>
                      <DoneIcon/>
                      </Avatar>
                      <ListItemText primary={i} /> 
                      </ListItem>))
                    } 
                </List>

              </TableCell>

              <TableCell key={'end'}>

                  <Stack direction={'row'}>
                  <Avatar sx={{width:20,height:20,mr:1,background:'none',color:'primary.light'}}>
                    <StarRoundedIcon/>
                  </Avatar>
                  <Typography>
                  {row.rating}
                  </Typography>
                  </Stack>       
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>:<></>
    }
  </Stack>
  )
}

export default TodayMenu