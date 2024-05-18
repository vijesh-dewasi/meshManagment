import React from 'react'
import { useTheme } from '@emotion/react';
import { useContext } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ColorModeContext } from '../colorModeContext';
import IconButton from '@mui/material/IconButton';

const DarkModeBtn = () => {
    const theme = useTheme();
    const setMode = useContext(ColorModeContext);
    const toggleColorMode = () => {setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}
    return (
    <IconButton sx={{ ml: 1 }} onClick={()=>{toggleColorMode()}} color="inherit">
    {theme.palette.mode === 'dark' ? 
    <Brightness7Icon /> : 
    <Brightness4Icon />}
    </IconButton>
  )
}

export default DarkModeBtn