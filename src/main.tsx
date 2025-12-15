import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './providers/AuthProvider.tsx'

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F6F8",
      paper: "#ffffff"
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
