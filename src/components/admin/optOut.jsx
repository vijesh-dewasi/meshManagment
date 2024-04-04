import { Button } from '@mui/material'
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import { useFullScreenContext } from '../../fullScreenProvider';
import { useSnackContext } from '../../SnackProvider';


const OptOut = () => {

    const [optOuts,setOptOuts]=useState(5);
    const[opt, setOpt] = useState(false)
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();
  
    
    const submitOpt=(e)=>{
       e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formData={
          newOptOuts:data.get('optOuts'),
          meshNo:'4'
        };
        console.log(formData)
        
        setFullScreen(true)

        const queryParams = new URLSearchParams(formData).toString();
        
        const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/optOutChanger?"+queryParams;    
            
            fetch(url, {
              method: 'POST',
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
              setFullScreen(false)
            })
            .catch(error => {
              console.error('Error:', error)
              setFullScreen(false)
            })
    }
    
    const changeOpt=()=>{
      setFullScreen(true)
      setOpt(true)
      const url='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/optouts"

      fetch(url,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(response=>{
        if(!response.ok) throw new Error('Network response was not ok')
        return response.json()
      }).then(data=>{
        console.log('Response:',data)
        setOptOuts(data.optOuts)
        setFullScreen(false)
      }).catch(error=>{
        setOptOuts(10)
        console.error('Error:',error)
        setFullScreen(false)
      })
    }

  return (
    <>

    <Button onClick={()=>{changeOpt()}} variant='contained' startIcon={<NoDrinksIcon/>}>
     change Opts
   </Button>

    <Dialog
        open={opt}
        onClose={()=>{setOpt(false)}}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitOpt(e)}
        }}
      >
        <DialogTitle>Change the allowed Freeable opt outs</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>
        <DialogContentText>
            currently you are allowing {optOuts} opt outs
        </DialogContentText>
                <TextField
                    inputProps={{ max:31,min:0}}
                    margin="dense"
                    id="optOuts"
                    name="optOuts"
                    label="opt outs"
                    type="number"
                    fullWidth
                    variant="standard"
                    required
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpt(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
     </Dialog> 
    </>
  )
}

export default OptOut