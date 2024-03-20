import {useState} from 'react'
import { Button, Grid,Chip,Stack} from '@mui/material'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import dayjs from 'dayjs'
import DownloadIcon from '@mui/icons-material/Download';


const Students = () => {
    
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
    const [student, setStudent] = useState(false);
    const [option,setOption] =useState('none');
    
    const [helper,setHelper]=useState(false);

    const fullName="mahesh meena"
    const rollNo="21UCSE87"
    const Dob=new Date();
    const branch="cse"
    const nfc="1234567890"

    const [mobile,setMobile]=useState("")
    const [email,setEmail]=useState("")

    const closeStudent=()=>{setStudent(false)} 
    
    const changeOption=(s)=>{
        setStudent(false)
        setOption(s)
    }

    const submitAddOne=(e)=>{
      e.preventDefault();
      console.log(e.target.fullName.value)
      console.log(e.target.rollNO.value)
      console.log(e.target.dob.value)
      console.log(e.target.nfc.value)
      console.log(e.target.branch.value)
      console.log(e.target.mobile.value)
      console.log(e.target.email.value)
      setOption('none')
    }
    const submitAddBulk = (e)=>{
      e.preventDefault();
      console.log(e.target.studentList.files[0])
      setOption('none')
    }

    const submitDeleteOne=(e)=>{
      e.preventDefault();
      console.log(e.target.rollNO.value)
      setOption('none')
    }
    const submitDeleteAll=(e)=>{
      e.preventDefault();
      console.log("delete all")
      setOption('none')
    }

    const submitEdit=(e)=>{
      e.preventDefault();
      console.log(e.target.rollNO.value)
      // fetc the date and update the values of the external variables
      setOption('editWithRoll')
    }

    const submitEditWithRoll=(e)=>{
      e.preventDefault();
      console.log(e.target.fullName.value)
      console.log(e.target.rollNo.value)
      console.log(e.target.dob.value)
      console.log(e.target.nfc.value)
      console.log(e.target.branch.value)
      console.log(e.target.mobile.value)
      console.log(e.target.email.value)
      setOption('none')
    }

    
    const submitViewOne=(e)=>{
      e.preventDefault();
      console.log(e.target.rollNO.value)
      // fetch the data and update the values of the external variables to be viewed    
      setOption('viewOneRoll')
    }
    const downloadAllView=()=>{
      console.log("download all")
      setOption('none')
    }

    const submitViewWithRoll=(e)=>{
      e.preventDefault();
      console.log("view with roll")
      setOption('none')
    }
    
  return (
  <>

    
   <Button onClick={()=>{setStudent(true)}} variant='contained' startIcon={<GroupsIcon/>}>
    Students
   </Button>

    {/* studnet options Dialog */}

    <Dialog
        open={student}
        onClose={closeStudent}
      >
        <DialogTitle>Manipulate student details</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>

            <Stack direction={'column'} gap={2}>
                <Button onClick={(e)=>{changeOption('add')}} variant='contained' startIcon={<AddCircleOutlineIcon/>}>ADD</Button> 
                <Button onClick={(e)=>{changeOption('delete')}} variant='contained' startIcon={<DeleteIcon/>}>DELETE</Button>
                <Button onClick={(e)=>{changeOption('edit')}} variant='contained' startIcon={<EditIcon/>}>EDIT</Button>
                <Button onClick={(e)=>{changeOption('view')}} variant='contained' startIcon={<VisibilityIcon/>}>VIEW</Button>
            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setStudent(false)}}>Cancel</Button>
        </DialogActions>
     </Dialog>

     {/* add student dialog */}

     <Dialog
        open={option==='add'?true:false}
        onClose={()=>{setOption('none')}}
      >
        <DialogTitle>Add student</DialogTitle>
       
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
       
        <Stack direction={'column'} gap={2}>
        <Button onClick={(e)=>{changeOption('addBulk')}} variant='contained' startIcon={<GroupAddIcon/>}>Add In Bulk</Button>
        <Button onClick={(e)=>{changeOption('addOne')}} variant='contained' startIcon={<PlusOneIcon/>}>Add one only</Button>
        </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
        </DialogActions>
     </Dialog>


       {/* addBulk student dialog */}

     <Dialog
        open={option==='addBulk'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitAddBulk(e)}
        }}
        
      >
        <DialogTitle>Add Students in bulk</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px'}}}>

        <DialogContentText>
        Upload a spreadsheet containing the student details
        The spead sheet must  have column headers in the first row and the following columns:
        in the same order:
           
           <Grid container gap={1} my={2}>
              <Chip label="Full Name" color="primary"/>
              <Chip label="Roll No" color="primary"/>
              <Chip label="DOB" color="primary"/>
              <Chip label="NFC ID" color="primary"/>
              <Chip label="Mobile No" color="primary"/>
              <Chip label="Email" color="primary"/>
              <Chip label="Branch" color="primary"/>
           </Grid>
  
        </DialogContentText>  

        <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
          >
                  Upload Spreadsheet
                  <VisuallyHiddenInput name="studentList" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" max={1}/>
                </Button>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog> 

     {/* addOne student dialog */}

     <Dialog
        open={option==='addOne'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitAddOne(e)}
        }}
      >
        <DialogTitle>Add a student</DialogTitle>

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
                    variant="standard"
                    required
                />

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
                

                <DatePicker
                  slotProps={{ textField: { required: true }}} 
                  orientation="portrait"
                  id="dob"
                  name="dob"
                  disableFuture
                  label="dob"
                  />

                  <TextField
                    inputProps={{ maxLength: 35}}
                    margin="dense"
                    id="nfc"
                    name="nfc"
                    label="NFC ID"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />

                  <TextField
                    inputProps={{ maxLength:15}}
                    margin="dense"
                    id="branch"
                    name="branch"
                    label="branch"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                />

                <TextField
                    margin="dense"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength:10,minLength:10}}
                    value={mobile}
                    helperText={helper?"pls enter number only":""}
                    onChange={(e)=>{
                      const num=e.target.value;
                      if(/^\d+$/.test(num)){
                      setMobile(num)
                      }
                      else{
                      setMobile("")
                      setHelper(true);
                      }
                    }}
                    required
                />

                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                />

            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog> 

      {/* delete student dialog */}                    

     <Dialog
        open={option==='delete'?true:false}
        onClose={()=>{setOption('none')}}
      >
        <DialogTitle>Deletion</DialogTitle>
       
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
       
        <Stack direction={'column'} gap={2}>
        <Button onClick={(e)=>{changeOption('deleteOne')}} variant='contained' startIcon={<PersonRemoveAlt1Icon/>}>delete one only</Button>
        <Button onClick={(e)=>{changeOption('deleteAll')}} variant='contained' startIcon={<GroupAddIcon/>}>Delete All</Button>
        </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
        </DialogActions>
     </Dialog>


       {/* delete one student dialog */}
        
     <Dialog
       open={option==='deleteOne'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitDeleteOne(e)}
        }}
      >
        <DialogTitle>Delete student</DialogTitle>

      
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>

         <DialogContentText>
         Enter the roll number of the student to be deleted
          we will not be able to recover the data once deleted
          we advice to get a backup of the data before deleting
          </DialogContentText> 

        <TextField
                    inputProps={{ maxLength: 25}}
                    margin="dense"
                    id="rollNO"
                    name="rollNO"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="standard"
         />
                
      
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog>

      {/* delete all student dialog */}

      <Dialog
       open={option==='deleteAll'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitDeleteAll(e)}
        }}
      >
        <DialogTitle>Delete All students</DialogTitle>
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
         <DialogContentText>
          Are you sure you want to delete all the students?
          we will not be able to recover the data once deleted
          we advice to get a backup of the data before deleting
          </DialogContentText> 
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button variant='contained' color='error' type="submit">Delete All</Button>
        </DialogActions>
     </Dialog>

      {/* edit student dialog */}

     <Dialog
        open={option==='edit'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitEdit(e)}
        }}
      >
        <DialogTitle>Edit Student</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>

         <DialogContentText>
          Enter the roll number of the student to be edited
        </DialogContentText> 

        <TextField
                    inputProps={{ maxLength: 25}}
                    margin="dense"
                    id="rollNO"
                    name="rollNO"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="standard"
         /> 
        
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog>

      {/* edit with roll student dialog */}

      <Dialog
        open={option==='editWithRoll'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitEditWithRoll(e)}
        }}
      >
        <DialogTitle>Edit the student</DialogTitle>

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
                    variant="standard"
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
                    variant="standard"
                    defaultValue={rollNo}   
                />

                <TextField
                    margin="dense"
                    id="nfc"
                    name="nfc"
                    label="NFC ID"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={nfc}   
                />
                
                <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="dob"
                  name="dob"
                  disableFuture
                  label="dob"
                  defaultValue={dayjs(Dob)}
                  />

                  <TextField
                    inputProps={{ maxLength:15}}
                    margin="dense"
                    id="branch"
                    name="branch"
                    label="branch"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={branch}
                />

                <TextField
                    margin="dense"
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength:10,minLength:10}}
                    value={mobile}
                    helperText={helper?"pls enter number only":""}
                    onChange={(e)=>{
                      const num=e.target.value;
                      if(/^\d+$/.test(num)){
                      setMobile(num)
                      }
                      else{
                      setMobile("")
                      setHelper(true);
                      }
                    }}
                />

                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />

            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog> 


      {/* view student dialog*/}

      <Dialog
        open={option==='view'?true:false}
        onClose={()=>{setOption('none')}}
      >
        <DialogTitle>view student details</DialogTitle>
       
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
       
        <Stack direction={'column'} gap={2}>
        <Button onClick={(e)=>{changeOption('viewOne')}} variant='contained' startIcon={<PersonRemoveAlt1Icon/>}>view one</Button>
        <Button onClick={(e)=>{changeOption('viewAll')}} variant='contained' startIcon={<GroupAddIcon/>}>view All</Button>
        </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
        </DialogActions>
     </Dialog>


      {/* view one student dialog */}

     <Dialog
        open={option==='viewOne'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitViewOne(e)}
        }}
      >
        <DialogTitle>view student</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>

        <DialogContentText>
          Enter the roll number of the student to be viewed
        </DialogContentText> 

        <TextField
                    inputProps={{ maxLength: 25}}
                    margin="dense"
                    id="rollNO"
                    name="rollNO"
                    label="Roll No"
                    type="text"
                    fullWidth
                    variant="standard"
         /> 
       
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog> 

       {/* view student with roll dialog */} 
       
       <Dialog
        open={option==='viewOneRoll'?true:false}
        onClose={()=>{setOption('none')}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitViewWithRoll(e)}
        }}
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
                    id="nfc"
                    name="nfc"
                    label="NFC ID"
                    type="text"
                    fullWidth
                    variant="filled"
                    disabled
                    defaultValue={nfc}   
                />
                
                <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="dob"
                  name="dob"
                  disableFuture
                  label="dob"
                  defaultValue={dayjs(Dob)}
                  disabled
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
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="filled"
                    disabled
                    value={email}
                />

            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button type="submit">Done</Button>
        </DialogActions>
     </Dialog> 


        {/* view all student dialog*/}  

       <Dialog
        open={option==='viewAll'?true:false}
        onClose={()=>{setOption('none')}}
      >
        <DialogTitle>view all student </DialogTitle>
       
        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
        <DialogContentText>
          you can view all the students by downloading the spreadsheet
        </DialogContentText>  
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{setOption('none')}}>Cancel</Button>
          <Button onClick={()=>{downloadAllView()}} startIcon={<DownloadIcon/>} variant='contained'>Download</Button>
        </DialogActions>
     </Dialog>

  </>
  )
}
export default Students