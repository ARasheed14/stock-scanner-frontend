import './App.css'
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'

import StockTable from './components/data-grid-component/data-grid-component'
import SideBar from './components/sidebar-component/sidebar-component'
import { useState } from 'react';

function App() {

  const [priceChangePct, setPriceChangePct] = useState<"4" | "10" | null>(null);

  return (
    <>
      <CssBaseline />
      
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Stock Screener
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

        <SideBar 
          priceChangePct={priceChangePct}
          onPriceChangePct={setPriceChangePct}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <StockTable />
        </Box>
      </Box>
    </>
  )
}

export default App
