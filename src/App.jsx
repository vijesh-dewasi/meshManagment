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

import { useState,useMemo, } from 'react';
import { amber, deepOrange, grey } from '@mui/material/colors';
import {
  BrowserRouter as Router,
  Routes, Route,Link as RouterLink, Navigate,
} from 'react-router-dom'

import { ColorModeContext } from './colorModeContext';

function App() {

  const [mode, setMode] =useState('light');

    const getDesignTokens = (mode) => {
      const light = {
        palette: {
          type: 'light',
          primary: {
            main: '#229769',
          },
          secondary: {
            main: '#193752',
          },
          background: {
            default: '#ffffff',
            paper: '#ebf7f0',
          },
          text: {
            secondary: '#477371',
            primary: '#193752',
            disabled: '#28435C',
          },
        },
      };
  
      const dark = {
        palette: {
          type: 'light',
          primary: {
            main: '#191a19',
          },
          secondary: {
            main: '#1e5128',
          },
          background: {
            default: '#1e1d1d',
            paper: '#202220',
          },
          text: {
            secondary: '#346751',
            primary: '#4e9f3d',
            disabled: '#669c5d',
            hint: '#88de70',
          },
        },
      };
  
      return mode === 'dark' ? dark : light;
    };
  
    const theme = useMemo(
      () =>
        createTheme(getDesignTokens(mode)),
      [mode],
    );
  
  
  return (
      <>
      <ColorModeContext.Provider value={setMode} >
      <ThemeProvider theme={theme}>
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

          <Route path="/login" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
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
      </ColorModeContext.Provider>

      </>
  )
}


export default App
