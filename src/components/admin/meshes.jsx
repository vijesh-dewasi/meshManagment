import {useState} from 'react'
import { Button, Grid,Chip,Stack,RadioGroup,Radio,FormControlLabel} from '@mui/material'
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
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import DownloadIcon from '@mui/icons-material/Download';



const Meshes = () => {
  
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

        const [mesh, setmesh] = useState(false);
        const [option,setOption] =useState('none');
        const [choice,setChoice]=useState('meshNo') // ['meshNo','wardenEmail'

        const [helper,setHelper]=useState(false);
  
        const wardenName="mahesh meena"
        const wardenEmail="xyz@mdkjf.com"
        const meshNo="123"

        const managerName="vijesh meena"
        const managerEmail="hudsf@dkjfd.com"
    
        const [wardenMobile,setWardenMobile]=useState("")
        const [managerMobile,setManagerMobile]=useState("")
        
        const closemesh=()=>{setmesh(false)} 
        
        const changeOption=(s)=>{
            setmesh(false)
            setOption(s)
        }
    
        const submitAddOne=(e)=>{
          e.preventDefault();
          console.log(e.target.wardenName.value)
          console.log(e.target.wardenEmail.value)
          console.log(e.target.wardenMobile.value)
          console.log(e.target.managerName.value)
          console.log(e.target.managerEmail.value)
          console.log(e.target.managerMobile.value)
          setOption('none')
        }
        const submitAddBulk = (e)=>{
          e.preventDefault();
          console.log(e.target.meshList.files[0])
          setOption('none')
        }
    
        const submitDeleteOne=(e)=>{
          e.preventDefault();
          console.log(e.target.wardenEmail.value)
          setOption('none')
        }

        const submitDeleteAll=(e)=>{
          e.preventDefault();
          console.log("delete all")
          setOption('none')
        }
    
        const submitEdit=(e)=>{
          e.preventDefault();
          console.log(e.target.wardenEmail.value)
          // fetch the date and update the values of the external variables
          // warden email and mobile
          setOption('editWithWardenEmail')
        }
    
        const submitEditWithWardenEmail=(e)=>{
          e.preventDefault();
          console.log(e.target.wardenName.value)
          console.log(e.target.wardenEmail.value)
          console.log(e.target.wardenMobile.value)
          console.log(e.target.managerName.value)
          console.log(e.target.managerEmail.value)
          console.log(e.target.managerMobile.value)
          setOption('none')
        }
    
        
        const submitViewOne=(e)=>{
          e.preventDefault();
          console.log(e.target.wardenEmail.value)
          // fetch the data and update the values of the external variables to be viewed    
          setOption('viewOneWardenMail')
        }
        const downloadAllView=()=>{
          console.log("download all")
          setOption('none')
        }
    
        const submitViewWithEmail=(e)=>{
          e.preventDefault();
          console.log("view with wardens email")
          setOption('none')
        }
        
      return (
      <>
    
        
       <Button onClick={()=>{setmesh(true)}} variant='contained' startIcon={<GroupsIcon/>}>
        meshes
       </Button>
    
        {/* studnet options Dialog */}
    
        <Dialog
            open={mesh}
            onClose={closemesh}
          >
            <DialogTitle>Manipulate mesh details</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
                <Stack direction={'column'} gap={2}>
                    <Button onClick={(e)=>{changeOption('add')}} variant='contained' startIcon={<AddCircleOutlineIcon/>}>ADD</Button> 
                    <Button onClick={(e)=>{changeOption('delete')}} variant='contained' startIcon={<DeleteIcon/>}>DELETE</Button>
                    <Button onClick={(e)=>{changeOption('edit')}} variant='contained' startIcon={<EditIcon/>}>EDIT</Button>
                    <Button onClick={(e)=>{changeOption('view')}} variant='contained' startIcon={<VisibilityIcon/>}>VIEW</Button>
                </Stack>
           
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setmesh(false)}}>Cancel</Button>
            </DialogActions>
         </Dialog>
    
         {/* add mesh dialog */}
    
         <Dialog
            open={option==='add'?true:false}
            onClose={()=>{setOption('none')}}
          >
            <DialogTitle>Add mesh</DialogTitle>
           
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
    
    
           {/* addBulk mesh dialog */}
    
         <Dialog
            open={option==='addBulk'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitAddBulk(e)}
            }}
            
          >
            <DialogTitle>Add meshes in bulk</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px'}}}>
    
            <DialogContentText>
            Upload a spreadsheet containing the mesh details
            The spead sheet must  have column headers in the first row and the following columns:
            in the same order:
               
               <Grid container gap={1} my={2}>
                  <Chip label="Mesh No" color="primary"/>
                  <Chip label="Warden Name" color="primary"/>
                  <Chip label="Warden Mobile" color="primary"/>
                  <Chip label="Warden Email" color="primary"/>
                  <Chip label="Manager Name" color="primary"/>
                  <Chip label="Manager Mobile" color="primary"/>
                  <Chip label="Manager Email" color="primary"/>
               </Grid>
      
            </DialogContentText>  
    
            <Button
                      component="label"
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
              >
                      Upload Spreadsheet
                      <VisuallyHiddenInput name="meshList" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" max={1}/>
                    </Button>
           
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
         </Dialog> 
    
         {/* addOne mesh dialog */}
    
         <Dialog
            open={option==='addOne'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitAddOne(e)}
            }}
          >
            <DialogTitle>Add a mesh</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
            <Stack direction={'column'} gap={2}>
    
                    <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="wardenName"
                        name="wardenName"
                        label="Warden Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
    
                    <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="wardenEmail"
                        name="wardenEmail"
                        label="Warden Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        required
                    />

                    <TextField
                        margin="dense"
                        id="wardenMobile"
                        name="wardenMobile"
                        label="Warden Mobile"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength:10,minLength:10}}
                        value={wardenMobile}
                        helperText={helper?"pls enter number only":""}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setWardenMobile(num)
                          }
                          else{
                          setWardenMobile("")
                          setHelper(true);
                          }
                        }}
                        required
                    />  

                    <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="managerName"
                        name="managerName"
                        label="Manager Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
    
                    <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="managerEmail"
                        name="managerEmail"
                        label="Manager Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        required
                    />
    
                     
                      <TextField
                        margin="dense"
                        id="managerMobile"
                        name="managerMobile"
                        label="Manager Mobile"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength:10,minLength:10}}
                        value={managerMobile}
                        helperText={helper?"pls enter number only":""}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setManagerMobile(num)
                          }
                          else{
                          setManagerMobile("")
                          setHelper(true);
                          }
                        }}
                        required
                    />  
    
                    
    
                </Stack>
           
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
         </Dialog> 
    
          {/* delete mesh dialog */}                    
    
         <Dialog
            open={option==='delete'?true:false}
            onClose={()=>{setOption('none')}}
          >
            <DialogTitle>Deletion</DialogTitle>
           
                <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
              
                <Stack direction={'column'} gap={2}>
                <Button onClick={(e)=>{changeOption('deleteOne')}} variant='contained' startIcon={<PersonRemoveAlt1Icon/>}>Delete one only</Button>
                <Button onClick={(e)=>{changeOption('deleteAll')}} variant='contained' startIcon={<GroupAddIcon/>}>Delete All</Button>
                </Stack>
        
                </DialogContent>
    
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
            </DialogActions>
         </Dialog>
    
    
           {/* delete one mesh dialog */}
            
         <Dialog
           open={option==='deleteOne'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitDeleteOne(e)}
            }}
          >
            <DialogTitle>Delete mesh</DialogTitle>
    
          
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
             <DialogContentText>
             Enter the mesh No or warden's Email of the mesh to be deleted you can view the wardens email in the view option
              </DialogContentText> 

              <RadioGroup
                    name="choice"
                    id="choice"
                    value={choice}
                    onChange={(e)=>(setChoice(e.target.value))}
                    required
                  >
                    <FormControlLabel value="meshNo" control={<Radio />} label="Mesh NO" />
                    <FormControlLabel value="wardenEmail" control={<Radio />} label="Warden Email" />
                  </RadioGroup> 


            {choice==='meshNo'?<TextField
                        inputProps={{max:100,min:1}}
                        margin="dense"
                        id="meshNo"
                        name="meshNo"
                        label="Mesh No"
                        type="number"
                        fullWidth
                        variant="standard"
             />:
             <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="wardenEmail"
                        name="wardenEmail"
                        label="Warden Email"
                        type="email"
                        fullWidth
                        variant="standard"
             />  
             }
                    
          
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
         </Dialog>
    
          {/* delete all mesh dialog */}
    
          <Dialog
           open={option==='deleteAll'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitDeleteAll(e)}
            }}
          >
            <DialogTitle>Delete All meshes</DialogTitle>
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
             <DialogContentText>
              Are you sure you want to delete all the meshes?
              we will not be able to recover the data once deleted
              we advice to get a backup of the data before deleting
              </DialogContentText> 
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button variant='contained' color='error' type="submit">Delete All</Button>
            </DialogActions>
         </Dialog>
    
          {/* edit mesh dialog */}
    
         <Dialog
            open={option==='edit'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitEdit(e)}
            }}
          >
            <DialogTitle>Edit mesh</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
            <DialogContentText>
              Enter the mesh no or Warden's Email of the mesh to be edited
            </DialogContentText> 

             <RadioGroup
                    name="choice"
                    id="choice"
                    value={choice}
                    onChange={(e)=>(setChoice(e.target.value))}
                    required
                  >
                    <FormControlLabel value="meshNo" control={<Radio />} label="Mesh NO" />
                    <FormControlLabel value="wardenEmail" control={<Radio />} label="Warden Email" />
                  </RadioGroup>  

             {choice==='meshNo'?<TextField
                        inputProps={{max:100,min:1}}
                        margin="dense"
                        id="meshNo"
                        name="meshNo"
                        label="Mesh No"
                        type="number"
                        fullWidth
                        variant="standard"
             />: 
            <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="wardenEmail"
                        name="wardenEmail"
                        label="Warden Email"
                        type="email"
                        fullWidth
                        variant="standard"
             />} 
            
            </DialogContent>
    
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
         </Dialog>
    
          {/* edit with warden email mesh dialog */}
    
          <Dialog
            open={option==='editWithWardenEmail'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitEditWithWardenEmail(e)}
            }}
          >
            <DialogTitle>Edit the mesh</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
            <Stack direction={'column'} gap={2}>

              <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="meshNo"
                        name="meshNo"
                        label="Mesh No"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={meshNo}
                        disabled
                />

            <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="wardenName"
                        name="wardenName"
                        label="Warden Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={wardenName}
                        required
                    />
    
                    <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="wardenEmail"
                        name="wardenEmail"
                        label="Warden Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={wardenEmail}
                        required
                    />

                    <TextField
                        margin="dense"
                        id="wardenMobile"
                        name="wardenMobile"
                        label="Warden Mobile"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength:10,minLength:10}}
                        value={wardenMobile}
                        helperText={helper?"pls enter number only":""}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setWardenMobile(num)
                          }
                          else{
                          setWardenMobile("")
                          setHelper(true);
                          }
                        }}
                        required
                    />  

                    <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="managerName"
                        name="managerName"
                        label="Manager Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={managerName}
                    />
    
                    <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="managerEmail"
                        name="managerEmail"
                        label="Manager Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={managerEmail}
                        required
                    />
    
                     
                      <TextField
                        margin="dense"
                        id="managerMobile"
                        name="managerMobile"
                        label="Manager Mobile"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength:10,minLength:10}}
                        value={managerMobile}
                        helperText={helper?"pls enter number only":""}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setManagerMobile(num)
                          }
                          else{
                          setManagerMobile("")
                          setHelper(true);
                          }
                        }}
                        required
                    /> 
    
                </Stack>
           
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
         </Dialog> 
    
    
          {/* view mesh dialog*/}
    
          <Dialog
            open={option==='view'?true:false}
            onClose={()=>{setOption('none')}}
          >
            <DialogTitle>view mesh details</DialogTitle>
           
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
    
    
          {/* view one mesh dialog */}
    
         <Dialog
            open={option==='viewOne'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitViewOne(e)}
            }}
          >
            <DialogTitle>view mesh</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
            <DialogContentText>
              Enter the mesh no or warden email of the mesh to be viewed
            </DialogContentText> 

              <RadioGroup
                    name="choice"
                    id="choice"
                    value={choice}
                    onChange={(e)=>(setChoice(e.target.value))}
                    required
                  >
                    <FormControlLabel value="meshNo" control={<Radio />} label="Mesh NO" />
                    <FormControlLabel value="wardenEmail" control={<Radio />} label="Warden Email" />
                  </RadioGroup>  

             {choice==='meshNo'?<TextField
                        inputProps={{max:100,min:1}}
                        margin="dense"
                        id="meshNo"
                        name="meshNo"
                        label="Mesh No"
                        type="number"
                        fullWidth
                        variant="standard"
             />: 

            <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="wardenEmail"
                        name="wardenEmail"
                        label="Warden Email"
                        type="email"
                        fullWidth
                        variant="standard"
             /> }
           
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setOption('none')}}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
         </Dialog> 
    
           {/* view mesh with warden dialog */} 
           
           <Dialog
            open={option==='viewOneWardenMail'?true:false}
            onClose={()=>{setOption('none')}}
            PaperProps={{
              component: 'form',
              onSubmit: (e) => {submitViewWithEmail(e)}
            }}
          >
            <DialogTitle>mesh description</DialogTitle>
    
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
    
            <Stack direction={'column'} gap={2}>

             <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="meshNo"
                        name="meshNo"
                        label="Mesh No"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={meshNo}
                        disabled
                /> 

            <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="wardenName"
                        name="wardenName"
                        label="Warden Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={wardenName}
                        disabled
                    />
    
                    <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="wardenEmail"
                        name="wardenEmail"
                        label="Warden Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={wardenEmail}
                        disabled
                    />

                    <TextField
                        margin="dense"
                        id="wardenMobile"
                        name="wardenMobile"
                        label="Warden Mobile"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength:10,minLength:10}}
                        value={wardenMobile}
                        helperText={helper?"pls enter number only":""}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setWardenMobile(num)
                          }
                          else{
                          setWardenMobile("")
                          setHelper(true);
                          }
                        }}
                        disabled
                    />  

                    <TextField
                        inputProps={{ maxLength: 25}}               
                        margin="dense"
                        id="managerName"
                        name="managerName"
                        label="Manager Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        disabled
                        value={managerName}
                    />
    
                    <TextField
                        inputProps={{ maxLength: 25}}
                        margin="dense"
                        id="managerEmail"
                        name="managerEmail"
                        label="Manager Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={managerEmail}
                        disabled
                    />
    
                     
                      <TextField
                        margin="dense"
                        id="managerMobile"
                        name="managerMobile"
                        label="Manager Mobile"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength:10,minLength:10}}
                        value={managerMobile}
                        helperText={helper?"pls enter number only":""}
                        onChange={(e)=>{
                          const num=e.target.value;
                          if(/^\d+$/.test(num)){
                          setManagerMobile(num)
                          }
                          else{
                          setManagerMobile("")
                          setHelper(true);
                          }
                        }}
                        disabled
                    /> 
    
                </Stack>
           
            </DialogContent>
            <DialogActions>
              <Button type="submit">Done</Button>
            </DialogActions>
         </Dialog> 
    
    
            {/* view all mesh dialog*/}  
    
           <Dialog
            open={option==='viewAll'?true:false}
            onClose={()=>{setOption('none')}}
          >
            <DialogTitle>view all mesh </DialogTitle>
           
            <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
            <DialogContentText>
              you can view all the meshes by downloading the spreadsheet
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

export default Meshes


