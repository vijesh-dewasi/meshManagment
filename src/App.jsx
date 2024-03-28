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
import ForgotPass from './components/forgotpass.jsx';
import ForgotPassUniv from './components/forgotPassUniv.jsx';

import {
  BrowserRouter as Router,
  Routes, Route,Link as RouterLink, Navigate,
} from 'react-router-dom'

function App() {
  const defaultTheme = createTheme();

  return (
      <>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FullScreenProvider>
      <SnackProvider>
      

      <AlertSnack></AlertSnack>
      <FullScreenLoad></FullScreenLoad>
  

      <Router>
        <Routes>
          
          <Route path="/instsignup" element={<UnivSignUp />} />
          <Route path="/instlogin" element={<UnivLogin />} />
          <Route path="/forgotpassinst" element={<ForgotPassUniv/>}/>

          <Route path="/login" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgotpass" element={<ForgotPass/>}/>
          
          <Route path="/userdashboard" element={<UserDashBoard />} />
          <Route path="/admindashboard" element={<AdminDashBoard />} />
          <Route path="/univdashboard" element={<UnivDashBoard />} />

          <Route path="*" element={<Navigate to="/login" />} />     

        </Routes>
      </Router> 


      </SnackProvider>
      </FullScreenProvider>
      </LocalizationProvider>
      </ThemeProvider>
      </>
  )
}


export default App
