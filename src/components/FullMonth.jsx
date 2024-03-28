import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }){
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs(new Date());

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    const theme = useTheme();
    const lightBlueColor = theme.palette.primary.light;

    const boxStyle = {
      borderRadius: '50%',
      background: isSelected?'rgb(66, 165, 245)':lightBlueColor,
      background: isSelected?'linear-gradient(90deg, rgba(66,165,245,0.9) 0%, rgba(175,216,225,1) 52%)':'none'
    }
    
    return (
      <Box style={boxStyle}>
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Box>
    );

}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  return (
    
      <DateCalendar
        disabled
        defaultValue={null}
        loading={isLoading}
        disablePast
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


