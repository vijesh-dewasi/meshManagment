import { Button } from '@mui/material'
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';

const OptOut = () => {

    const optOuts=7;
    const[opt, setOpt] = useState(false)

    const submitOpt=(e)=>{
      e.preventDefault();
      console.log(e.target.optOuts.value)
      setOpt(false)
    }
    
    const changeOpt=()=>{
        setOpt(true)
        //fetch the current optouts from the server
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