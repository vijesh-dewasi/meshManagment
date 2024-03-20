import {useState} from 'react'
import {FormHelperText,Rating,Button,Stack,RadioGroup,Radio,FormControlLabel} from '@mui/material'
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import FeedbackIcon from '@mui/icons-material/Feedback';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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


const ActionButtons = () => {

    const [opt,setOpt]=useState(false);
    const [rate,setRate]=useState(false);
    const [feed,setFeed]=useState(false);
    const totalOpt=3;
    
    const [helper,setHelper]=useState(false);

    const today = new Date();
    const tomorrow = new Date(today);
    const oneMonth = new Date(today);
    const threeDayBack = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    oneMonth.setDate(oneMonth.getDate()+30);
    threeDayBack.setDate(threeDayBack.getDate()-3);
    
    const [from,setFrom]=useState(dayjs(tomorrow))
    const [mealTime,setMealTime]=useState('morning')

    const openOpt=(e)=>{
        setFeed(false);
        setRate(false);
        setOpt(true);
    }
    const closeOpt= (e)=>{
          setOpt(false);
    }
    const submitOpt=(e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson.reason,formJson.to,formJson.from);
        
        if(formJson.reason=="" || formJson.to=="" || formJson.from==""){
          setHelper(1)
          return
        }

        closeOpt()
    }

    const openFeed=(e)=>{
        setOpt(false);
        setRate(false);
        setFeed(true);
    }
    const closeFeed= (e)=>{
          setFeed(false);
    }

    const submitFeed=(e)=>{
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson.day,formJson.mealTime,formJson.feedback,formJson.foodImgs);
      
      if(formJson.day=="" || formJson.mealTime=="" ||formJson.feedback==""){
              setHelper(true)
              return
      }
      closeFeed()
    }

    const openRate=(e)=>{
        setOpt(false);
        setFeed(false);
        setRate(true);
    }
    const closeRate= (e)=>{
            setRate(false);
    }

    const submitRate=(e)=>{
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson.day,formJson.mealTime,formJson.stars);
          if(formJson.day=="" || formJson.mealTime=="" ||formJson.stars==""){
              setHelper(true)
              return
          }
          
          setRate(false)
    }


  return (
    <>
    <Stack direction={{sx:'column',md:"row"}} padding={3} gap={2} >
    <Button onClick={(e)=>{openOpt()}} sx={{maxHeight:60,maxWidth:300}} variant="contained" startIcon={<NoDrinksIcon/>}>
       opt out
     </Button>
     <Button onClick={(e)=>{openRate()}} sx={{maxHeight:60,maxWidth:300}} variant="contained" endIcon={<ThumbsUpDownIcon/>}>
       Rate
     </Button>
     <Button onClick={(e)=>{openFeed()}} sx={{maxHeight:60,maxWidth:300}} variant="contained" endIcon={<FeedbackIcon/>}>
       FeedBack
     </Button>
    </Stack>

    <Dialog
        open={opt}
        onClose={closeOpt}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitOpt(e)}
        }}
      >
        <DialogTitle>Opt out of upcoming meals</DialogTitle>

        <DialogContent>

          <DialogContentText>
           Note:Opting out of meal doesn't guarantee the waiving of fees of that meal.
           There is a limit on no of optout allowed.your institution only allow waivable {totalOpt} per Month
           you can even optout for saving food. 
          </DialogContentText>

        <Stack direction={'column'} gap={2}>
                <TextField
                    multiline
                    minRows={2}
                    autoFocus
                    required
                    margin="dense"
                    id="reason"
                    name="reason"
                    label="Reason (min 25 character)"
                    type="text"
                    fullWidth
                    variant="standard"
                    minLength={25}
                    maxLength={100}
                />

                 <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="from"
                  name="from"
                  disablePast
                  label="From"
                  value={from}
                  onChange={(val)=>{setFrom(val)}}
                  minDate={dayjs(tomorrow)}
                  maxDate={dayjs(oneMonth)} 
                  />
                  <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="to"
                  name="to"
                  disablePast
                  label="To"
                  minDate={from}
                  maxDate={dayjs(oneMonth)} 
                  />
            </Stack>

                 {helper?<FormHelperText>
                  "All fields are required"
                  </FormHelperText>:<></>}
       
        </DialogContent>
        <DialogActions>
          <Button onClick={closeOpt}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

        {/* for rate meals */}
        
      <Dialog
        open={rate}
        onClose={closeRate}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitRate(e)}
        }}
      >
        <DialogTitle>Rate meals</DialogTitle>

        <DialogContent>

          <DialogContentText>
           Note:You can Rate the meals upto three days back 
          </DialogContentText>

        <Stack direction={'column'} gap={2}>

                 <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="day"
                  name="day"
                  disableFuture
                  label="day"
                  maxDate={dayjs(today)}
                  minDate={dayjs(threeDayBack)} 
                  />

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

                  <Rating
                    name="stars"
                    id="stars"
                    required
                   />

                  {helper?<FormHelperText>
                  "All fields are required"
                  </FormHelperText>:<></>}

            </Stack>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRate}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog> 

      {/* Feedback */}

      <Dialog
        open={feed}
        onClose={closeFeed}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {submitFeed(e)}
        }}
      >
        <DialogTitle>Feed Back Form</DialogTitle>

        <DialogContent>

          <DialogContentText>
           Feel free to post food review weather positive or negative 
           You can post upto three photos along your Feedback
          </DialogContentText>

        <Stack direction={'column'} gap={2}>

                 <DatePicker 
                  slotProps={{ textField: { required: true }}}
                  orientation="portrait"
                  id="day"
                  name="day"
                  disableFuture
                  label="day"
                  maxDate={dayjs(today)}
                  minDate={dayjs(threeDayBack)} 
                  />

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

                  <TextField
                    multiline
                    minRows={4}
                    autoFocus
                    required
                    margin="dense"
                    id="feedback"
                    name="feedback"
                    label="Feedback (min 50 character)"
                    type="text"
                    fullWidth
                    variant="standard"
                    minLength={50}
                    maxLength={400}
                />
                  
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Images
                  <VisuallyHiddenInput name="foodImgs" accept="image/png,image/jpeg" type="file" multiple max={3}/>
                </Button>

                  {helper?<FormHelperText>
                  "All fields are required except images"
                  </FormHelperText>:<></>}

            </Stack>
       

        </DialogContent>
        <DialogActions>
          <Button onClick={closeFeed}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog> 
      
     </> 
  )
}

export default ActionButtons



