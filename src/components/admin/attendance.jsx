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
import {useFullScreenContext} from '../../fullScreenProvider.jsx';
import {useSnackContext} from '../../SnackProvider.jsx';


const Attendance = (props) => {
    
  const mesh=props.mesh

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
    
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();



    const [studentDetails,setStudentDetails]=useState(
      {fullName:'',
       rollNo:'',
       branch:'',
       mobile:'',
       optouts:'',
       toPayMeals:''})
    
    const changeOption=(s)=>{setOption(s)}

    const submitAttendanceOne=(e)=>{
      e.preventDefault();
      setFullScreen(true)
      // use roll no to fetch the data from the server for attendance details
      const formData={
        univesityId:'mbm',
        meshNo:mesh,
        rollNo:e.target.rollNo.value,
        fromMonth:e.target.fromMonth.value,
        toMonth:e.target.toMonth.value
      }
      const queryParams = new URLSearchParams(formData).toString();
      const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/attendanceOne?"+queryParams;    
            
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
        setStudentDetails({
          fullName:data.fullName,
          rollNo:data.rollNo,
          mobile:data.mobile,
          branch:data.branch,
          optouts:data.optouts,
          toPayMeals:data.toPayMeals
        })
        setFullScreen(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setStudentDetails({
          ...studentDetails,
          fullName:"Doe",
          branch:"CE",
          mobile:"1256789045",
          optouts:4,
          toPayMeals:160-5
        })
        setFullScreen(false)
      })
      setOption('viewAttendanceOne')
    }

    const submitAttendanceBulk = (e)=>{
      e.preventDefault();
      
      setFullScreen(true)

        let startMonth=e.target.fromMonth.value
        let endMonth=e.target.toMonth.value

          if(startMonth>=6 &&startMonth<=12)
            startMonth='2023'+'-'+startMonth;
          else
          startMonth='2024'+'-'+startMonth;

          if(endMonth>=6 &&endMonth<=12)
          endMonth='2023'+'-'+endMonth;
          else
          endMonth='2024'+'-'+endMonth;

    
      const formData={
        meshID:mesh,
        startMonth:startMonth,
        endMonth:endMonth,
      }

      const queryParams = new URLSearchParams(formData).toString();
      const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+ "/UnifiedMess/OptOutDownload?" +queryParams;    
            
      // fetch(url, {
      //   method: 'GET'
      // })
      // .then(response => {
      //   if (!response.ok) 
      //   throw new Error('Network response was not ok');
      //   const header = response.headers.get('Content-Disposition');
      //   const parts = header.split(';');
      //   const filename = parts[1].split('=')[1].replaceAll("\"", "");
      //   const blob = response.blob();
      //   return {blob,filename};
      // })
      // .then(data => {
      //       const {blob,filename}=data;
      //       if (blob != null) {
      //         var url = window.URL.createObjectURL(blob);
      //         var a = document.createElement('a');
      //         a.href = url;
      //         a.download = filename;
      //         document.body.appendChild(a);
      //         a.click();
      //         a.remove();
      //     }
      // })
      // .catch(error => {
      //   console.error('Error:', error)
      //   setFullScreen(false)
      // })

      window.open(url, '_blank', 'noopener,noreferrer');

      setFullScreen(false);
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
                    id="rollNo"
                    name="rollNo"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={studentDetails.rollNo}
                    onChange={(e)=>{setStudentDetails({...studentDetails,rollNo:e.target.value})}}
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
                    value={studentDetails.fullName}
                    
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
                    value={studentDetails.rollNo}
                    
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
                    value={studentDetails.optouts}
                    
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
                    value={studentDetails.branch}
                    
                />

                <TextField
                    margin="dense"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    value={studentDetails.mobile}
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
                    value={studentDetails.toPayMeals}
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