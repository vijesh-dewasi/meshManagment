import { Button, Grid } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Chip,Stack,RadioGroup,Radio,FormControlLabel} from '@mui/material'
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const UploadFood = () => {
    
    const [menu,setMenu]=useState(false);
    const [mealTime,setMealTime]=useState("morning");
    const [food,setFood]=useState([]);
    const [item,setItem]=useState("");

    const closeMenu=()=>{
        setMenu(false);
    }

    const submitMenu=(e)=>{
          e.preventDefault();
          // console.log(mealTime,food);  
    }
    const addItem=(e)=>{
            if(item=="")
            return;
            setFood([...food,item])
            setItem("")
    }

    const itemDelete=(i)=>{
            const newFood=food.filter((item,ind)=>{
                 return i!=ind;   
            })
            setFood(newFood);
    }

  return (
    <>

   <Button onClick={()=>{setMenu(true)}} variant='contained' startIcon={<RestaurantMenuIcon />}>
    Add Menu
   </Button>

   <Dialog
        open={menu}
        onClose={closeMenu}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitMenu(e)}
        }}
      >
        <DialogTitle>Add meal for Today</DialogTitle>

        <DialogContent sx={{maxWidth:{xs:'300px',md:'500px'}}}>

          <DialogContentText>
           pls select desired time and add meal for it one by one when you done submit
          </DialogContentText>

        <Stack direction={'column'} gap={2}>

                 
                  <RadioGroup
                    name="mealTime"
                    id="mealTime"
                    value={mealTime}
                    onChange={(e)=>(setMealTime(e.target.value))}
                    required
                  >
                    <FormControlLabel value="morning" control={<Radio />} label="Morning" />
                    <FormControlLabel value="evening" control={<Radio />} label="Evening" />
                  </RadioGroup>

                   <Grid container spacing={2}>
                  {food.map((foodItem,i)=>{
                        return(
                        <Grid item xs='auto'> 
                        <Chip
                        label={foodItem}
                        onDelete={()=>{itemDelete(i)}}
                        deleteIcon={<CloseIcon />}
                        variant="outlined"
                        />
                        </Grid>
                        )
                  })}

                   </Grid>
                   

                  <TextField
                    autoFocus
                    margin="dense"
                    id="item"
                    name="item"
                    label="Food Item"
                    type="text"
                    variant="standard"
                    minLength={3}
                    maxLength={15}
                    value={item}
                    onChange={(e)=>(setItem(e.target.value))}
                /> 

                <Button onClick={(e)=>{addItem(e)}}variant='contained' startIcon={<AddCircleOutlineIcon/>}>ADD</Button> 

            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setMenu(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>    
    </>

  )
}

export default UploadFood