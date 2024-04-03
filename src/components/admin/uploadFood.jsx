import { Button, Grid } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Chip,Stack,RadioGroup,Radio,FormControlLabel} from '@mui/material'
import { useState,useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useFullScreenContext } from '../../fullScreenProvider';
import { useSnackContext } from '../../SnackProvider';


    


const UploadFood = () => {
    
    const [menu,setMenu]=useState(false);
    const [mealTime,setMealTime]=useState("morning");
    const [food,setFood]=useState([]);
    const [item,setItem]=useState("");
    const {snack,setSnack}=useSnackContext();
    const {fullScreen,setFullScreen}=useFullScreenContext();


    const closeMenu=()=>{
        setMenu(false);
    }

    const submitMenu=(e)=>{
  
          e.preventDefault();
          
          const formData={
            mealTime:mealTime,
            food:food,
            meshNo:7,
            univ:'mbm'
          };
          console.log(formData)
          
          setFullScreen(true)
  
          const queryParams = new URLSearchParams(formData).toString();
          
          const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/uploadFood?"+queryParams;    
              
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
    
   useEffect(()=>{
     
    const formData={
      mealTime:mealTime,
      food:food,
      meshNo:7,
      univ:'mbm'
    };
    console.log(formData)
    
    setFullScreen(true)

    const queryParams = new URLSearchParams(formData).toString();
    
    const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/uploadFood?"+queryParams;    
        
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
          setFood(data.foodList)
          setFullScreen(false)
        })
        .catch(error => {
          console.error('Error:', error)
          setFullScreen(false)
        })  
   },[mealTime])
   
    

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