import { useEffect, useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import { useFullScreenContext } from '../fullScreenProvider';
import { useSnackContext } from '../SnackProvider';



const Stats = () => {

  const [view,setView]=useState(true)

  function createData(statTitle,value,type){return {statTitle,value,type}}
  
  const rows = [
    createData('opt out this month',4,'count'),
    createData('Mesh Average rating this month',2,'star'),
    createData('past meal rating',4,'star'),
    createData('previous month optouts',[{month:'Jan',value:5},{month:'Feb',value:3},{month:'Mar',value:2}],'list')
  ];

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
        
        const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/getStats?"+queryParams;    
            
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
              data.stats.forEach((x)=>{
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
            <Typography variant='h6'>
            Stats
            </Typography>
            <IconButton sx={{width:20,height:20,mr:1,background:'none',color:'primary.light'}} onClick={()=>(setView(!view))}>
            {view?<KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
            </IconButton>
            </Stack>

    <TableContainer >
      <Table  aria-label="simple table">
        {
          view?
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.statTitle}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                    <Typography>
                    {row.statTitle}
                    </Typography>
              </TableCell>

               {row.type=='count' || row.type=='star'?<TableCell align='right'>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                    <Avatar sx={{width:20,height:20,mr:1,background:'none',color:'primary.light'}}>
                    {row.type=='star'?<StarRoundedIcon/>:<AddIcon/>}
                    </Avatar>
                    <Typography>
                    {row.value}
                    </Typography>
                    </Stack>  
               </TableCell>: 

              <TableCell align='right'>
                <List dense disablePadding>
                    {row.value.map((i)=>
                     (<ListItem key={i} disableGutters>  
                      <ListItemText sx={{m:1}} primary={i.month} />
                      <Avatar sx={{width:20,height:20,background:'none',color:'primary.light'}}>
                      <AddIcon/>
                      </Avatar>
                      <ListItemText primary={i.value} />
                      </ListItem>))
                    } 
                </List>
              </TableCell>
              
              }
            </TableRow>
          ))}
        </TableBody>:<></>
        }
      </Table>
    </TableContainer>
  </Stack>
  )
}

export default Stats