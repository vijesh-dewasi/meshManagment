import './App.css'
import SignIn from './components/signin.jsx'
import SignUp from './components/signup.jsx';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import UserDashBoard from './components/userDashBoard.jsx';
import AdminDashBoard from './components/admin/adminDashBoard.jsx';
import UnivSignUp from './components/admin/univSignUp.jsx'
import UnivLogin from './components/admin/univLogin.jsx'
import UnivDashBoard from './components/admin/univDashBoard.jsx'
import AlertSnack from './components/alertSnack.jsx';
import FullScreenLoad from './components/fullScreenLoad.jsx';
import {SnackProvider} from './SnackProvider.jsx';
import {FullScreenProvider,useFullScreenContext} from './fullScreenProvider.jsx';

function App() {
  const defaultTheme = createTheme();

  return (
      <>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FullScreenProvider>
      <SnackProvider>
      

      {/* <AlertSnack></AlertSnack> */}
      {/* <FullScreenLoad></FullScreenLoad> */}

      <UnivSignUp></UnivSignUp>

      {/* <AdminDashBoard></AdminDashBoard> */}
      {/* <UnivDashBoard></UnivDashBoard> */}
      {/* <SignUp></SignUp> */}
      {/* <UserDashBoard></UserDashBoard> */}
      {/* <UnivLogin></UnivLogin>
      <SignIn></SignIn> */}
      
      </SnackProvider>
      </FullScreenProvider>
      </LocalizationProvider>
      </ThemeProvider>
      </>
  )
}


export default App
