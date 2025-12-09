import './App.css';
import { useState } from 'react';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';

import MarketOverview from './components/market-overview-component/market-overview';
import NewsSectionComponent from './components/news-section-component/news-section-component';
import SideBar from './components/sidebar-component/sidebar-component';
import StockTable from './components/data-grid-component/data-grid-component';

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

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

        <SideBar 
          priceChangePct={priceChangePct}
          onPriceChangePct={setPriceChangePct}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <MarketOverview />
          <StockTable />
          <NewsSectionComponent />
        </Box>
      </Box>
    </>
  )
}

export default App
