import {useState,useRef} from 'react'
import { DateCalendar } from '@mui/x-date-pickers'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useFullScreenContext } from '../fullScreenProvider';
import { useSnackContext } from '../SnackProvider';


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }){
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
      const mealsForDay=[1, 2, 3].map(() => getRandomNumber(1,2))

      resolve({ daysToHighlight,mealsForDay});
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

export default function DateCalendarServerRequest() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [totalMeals,setTotalMeals]=useState([]);  
  const {snack,setSnack}=useSnackContext();
  const {fullScreen,setFullScreen}=useFullScreenContext();
  const initialValue = dayjs(new Date());


    function ServerDay(props) {
      const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        const ind=highlightedDays.indexOf(props.day.date());
        const isSelected =!props.outsideCurrentMonth &&  ind>= 0;
        const mealsOnDay=ind>=0?totalMeals[ind]:0;
  
        const theme = useTheme();
        const darkColor = theme.palette.primary.dark;
        const lightColor = theme.palette.primary.light;
        const main = theme.palette.primary.main;

        const backGradient=mealsOnDay==2?
        'linear-gradient(90deg, rgba(66,165,245,0.9) 100%, rgba(175,216,225,1) 100%, rgba(175,216,225,1) 100%)':
        'linear-gradient(90deg, rgba(66,165,245,0.9) 47%, rgba(175,216,225,1) 49%, rgba(175,216,225,1) 57%)';
        
        
        const boxStyle = {
          borderRadius: '50%',
          background: isSelected?backGradient:'none'
        }
        
        return (
          <Box style={boxStyle}>
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
          </Box>
        );

    }

  const fetchHighlightedDays = (date) => {
    setFullScreen(true);
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight,mealsForDay }) => {
        setHighlightedDays(daysToHighlight);
        setTotalMeals(mealsForDay);
        setFullScreen(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

      // const data = new FormData(e.currentTarget);
      //   const formData={
      //     date: data.date
      //   };
      
      //   const queryParams = new URLSearchParams(formData).toString();
        
      //   const url ='http://'+import.meta.env.VITE_HOST+":"+import.meta.env.VITE_PORT+"/UnifiedMess/fullMonth?"+queryParams;    
            
      //       fetch(url, {
      //         method: 'GET',
      //         headers: {
      //           'Content-Type': 'application/json;charset=UTF-8'
      //         }
      //       })
      //       .then(response => {
      //         if (!response.ok) 
      //         throw new Error('Network response was not ok');
      //         return response.json()
      //       })
      //       .then(data => {
      //         console.log('Response:', data)
      //         setHighlightedDays(data.daysToHighlight);
      //         setTotalMeals(data.totalMeals);
      //         setFullScreen(false)
      //       })
      //       .catch(error => {
      //         console.error('Error:', error)
      //         setFullScreen(false)
      //       })

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  return (
    
      <DateCalendar
        disabled
        name="date"
        defaultValue={null}
        loading={fullScreen}
        onMonthChange={(date) => {
          fetchHighlightedDays(date);
        }}
        disableFuture
        disableHighlightToday
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
             day: ServerDay,
            leftArrowIcon:WatchLaterIcon,
            rightArrowIcon:ReceiptLongIcon
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
  );
}


