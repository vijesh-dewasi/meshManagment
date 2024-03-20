import {useState} from 'react'
import { Button,Stack} from '@mui/material'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from '@mui/icons-material/Person';

const Attendance = () => {
    
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });
    
    const [option,setOption] =useState('none');
    const [fromMonth,setFromMonth]=useState(1);
    const [toMonth,setToMonth]=useState(12);

    const rollNo="21UCSE87"
    const fullName="John Doe"
    const branch="CSE"
    const mobile="1234567890"
    const optouts=5
    const toPayMeals=60-5
    
    const changeOption=(s)=>{setOption(s)}

    const submitAttendanceOne=(e)=>{
      e.preventDefault();
      // use roll no to fetch the data from the server for attendance details
      setOption('viewAttendanceOne')
    }
    const submitAttendanceBulk = (e)=>{
      e.preventDefault();
      console.log("files downloaded")
      setOption('none')
    }
  
  return (
  <>
    
   <Button onClick={()=>{changeOption('attendance')}} variant='contained' startIcon={<PersonSearchIcon/>}>
    Attendance
   </Button>

     {/* options dialog */}

     <Dialog
        open={option==='attendance'?true:false}
        onClose={()=>{setOption('none')}}
      >
        <DialogTitle>Attendance options</DialogTitle>
       
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
       
        <Stack direction={'column'} gap={2}>

        <Button onClick={(e)=>{changeOption('attendanceBulk')}} variant='contained' startIcon={<GroupAddIcon/>}>Attendance of  Bulk</Button>
        <Button onClick={(e)=>{changeOption('attendanceOne')}} variant='contained' startIcon={<PersonIcon/>}>Attendance of one</Button>
        </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
        </DialogActions>

     </Dialog>


       {/* bulk attendance student dialog */}

     <Dialog
        open={option==='attendanceBulk'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitAttendanceBulk(e)}
        }}
        
      >
        <DialogTitle>Attendance in bulk</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px'}}}>
        <DialogContentText>
        enter the month then  Click the submit button below to download the spreadsheet of the students attendance for the selected month.
        </DialogContentText>  
                <TextField
                    inputProps={{ max:toMonth,min:1}}
                    margin="dense"
                    id="fromMonth"
                    name="fromMonth"
                    label="From Month"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={fromMonth}
                    onChange={(e)=>{setFromMonth(e.target.value)}}
                    required
                />
                <TextField
                    inputProps={{ max:12,min:fromMonth}}
                    margin="dense"
                    id="toMonth"
                    name="toMonth"
                    label="To Month"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={toMonth}
                    onChange={(e)=>{setToMonth(e.target.value)}}
                    required
                />

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button variant='contained' type="submit" startIcon={<DownloadIcon/>} >Download</Button>
        </DialogActions>
     </Dialog> 

     {/* Attendance of One student dialog */}

     <Dialog
        open={option==='attendanceOne'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitAttendanceOne(e)}
        }}
      >
        <DialogTitle>Find the student's attendance</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
        
        <Stack direction={'column'} gap={2}>
                <TextField
                    inputProps={{ maxLength: 25}}
                    margin="dense"
                    id="rollNO"
                    name="rollNO"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />
                 <TextField
                    inputProps={{ max:toMonth,min:1}}
                    margin="dense"
                    id="fromMonth"
                    name="fromMonth"
                    label="From Month"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={fromMonth}
                    onChange={(e)=>{setFromMonth(e.target.value)}}
                    required
                />
                <TextField
                    inputProps={{ max:12,min:fromMonth}}
                    margin="dense"
                    id="toMonth"
                    name="toMonth"
                    label="To Month"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={toMonth}
                    onChange={(e)=>{setToMonth(e.target.value)}}
                    required
                />
        </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button variant='contained' type="submit">Submit</Button>
        </DialogActions>
     </Dialog> 


       {/* view student attendance with roll dialog */} 
       
       <Dialog
        open={option==='viewAttendanceOne'?true:false}
        onClose={()=>{setOption('none')}}
      >
        <DialogTitle>student description</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>

        <Stack direction={'column'} gap={2}>

                <TextField
                    inputProps={{ maxLength: 25}}               
                    margin="dense"
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    disabled
                    defaultValue={fullName}
                />

                <TextField
                    inputProps={{ maxLength: 25}}
                    margin="dense"
                    id="rollNo"
                    name="rollNo"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="filled"
                    disabled
                    defaultValue={rollNo}   
                />

                <TextField
                    margin="dense"
                    id="optouts"
                    name="optouts"
                    label="opt outs"
                    type="number"
                    fullWidth
                    variant="filled"
                    disabled
                    defaultValue={optouts}   
                />
                

                  <TextField
                    inputProps={{ maxLength:15}}
                    margin="dense"
                    id="branch"
                    name="branch"
                    label="branch"
                    type="text"
                    fullWidth
                    variant="filled"
                    disabled
                    defaultValue={branch}
                />

                <TextField
                    margin="dense"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    value={mobile}
                    variant="filled"
                    disabled
                    inputProps={{ maxLength:10,minLength:10}}
                />

                <TextField
                    margin="dense"
                    id="toPayMeals"
                    name="toPayMeals"
                    label="Payable Meals"
                    type="toPayMeals"
                    fullWidth
                    variant="filled"
                    disabled
                    value={toPayMeals}
                />

            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>{setOption('none')}}>Done</Button>
        </DialogActions>
     </Dialog> 

  </>
  )
}
export default Attendance