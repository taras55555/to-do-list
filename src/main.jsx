import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ToDoListProvider } from './contexts/ToDoListContext.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    ochre: {
      main: '#ffa500',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#fff',
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoListProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ToDoListProvider>
  </StrictMode>,
)
