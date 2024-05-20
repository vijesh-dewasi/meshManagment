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



const Stats = (props) => {

  const [view,setView]=useState(true)
  const {mesh,role}=props;

  function createData(statTitle,value,type){return {statTitle,value,type}}
  
  const [rows,setRows] = useState([])


  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();
  
  useEffect(()=>{
        setFullScreen(true)
        const formData={
          messId:mesh,
          studentId:props.student_Email?props.student_Email:'maheshme2002@gmail.com'
        }
        const queryParams = new URLSearchParams(formData).toString();
        

            
            
            
            if(role=='Student'){

              const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/StudentStats?"+queryParams;    
            
            fetch(url, {
              method: 'GET'
            })
            .then(response => {
              if (!response.ok) 
              throw new Error('Network response was not ok');
              return response.json()
            })
            .then(data => {
              console.log('Response:', data)
              
              const fetched=[
                createData('Mesh Average rating this month',data.avgRating,'star'),
                createData('past meal rating',data.pastRating,'star'),
                createData('opt out this month',data.may,'count'),
                createData('previous month optouts',
                [
                {month:'Jan',value:data.jan},
                {month:'Feb',value:data.fab},
                {month:'Mar',value:data.march},
                {month:'Apr',value:data.april},
                {month:'May',value:data.may}
              ],'list'),
                 
              ]
              setRows(fetched)

              setFullScreen(false)
            })
            .catch(error => {
              console.error('Error:', error)
              setRows([
                createData('Mesh Average rating this month',2,'star'),
                createData('past meal rating',4,'star'),
                createData('opt out this month',6,'count'),
                createData('previous month optouts',
                [
                {month:'Jan',value:1},
                {month:'Feb',value:2},
                {month:'Mar',value:0},
                {month:'Apr',value:2},
                {month:'May',value:6}
              ],'list')
              ])
              setFullScreen(false)
            })

            }
            else{
              const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/GetRating?"+queryParams;    

              fetch(url, {
                method: 'GET'
              })
              .then(response => {
                if (!response.ok) 
                throw new Error('Network response was not ok');
                return response.json()
              })
              .then(data => {
                console.log('Response:', data)
                if(!data.avgRating)
                data.avgRating=2
                const fetched=[
                  createData('Mesh Average rating this month',data.avgRating,'star'),
                  createData('past meal rating',data.pastRating,'star'),
                ]
                setRows([fetched[0],fetched[1]])
                setFullScreen(false)
              })
              .catch(error => {
                console.error('Error:', error)
  
                setRows([
                  createData('Mesh Average rating this month',2,'star'),
                  createData('past meal rating',4,'star'),
                ])
                setFullScreen(false)
              })

            }
      
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