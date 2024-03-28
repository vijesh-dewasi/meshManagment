import React from 'react'
import {Snackbar} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useSnackContext } from '../SnackProvider';

const AlertSnack = (props) => {

    const {snack,setSnack}=useSnackContext();
    const handleClose=()=>{ setSnack({...snack,open:false})}
    
  return (
    <Snackbar
        anchorOrigin={{vertical:'top',horizontal:'center'}}
        open={snack.open}
        onClose={handleClose}
        autoHideDuration={4500}
        >
          <Alert
            onClose={handleClose}
            severity={snack.severity}
            variant="filled"
            sx={{ width: '100%' }}
            >
            {snack.msg}
            </Alert>
        </Snackbar>
  )
}

export default AlertSnack