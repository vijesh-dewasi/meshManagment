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

function App() {
  const defaultTheme = createTheme();

  return (
      <>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <AdminDashBoard></AdminDashBoard> */}
      <UnivDashBoard></UnivDashBoard>
      {/* <SignUp></SignUp> */}
      </LocalizationProvider>
      </ThemeProvider>
      </>
  )
}


export default App
