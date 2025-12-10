import './App.css';
import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

import HeaderComponent from './components/header-component/header-component';
import MarketOverviewComponent from './components/market-overview-component/market-overview';
import NewsSectionComponent from './components/news-section-component/news-section-component';
import SideBarComponent from './components/sidebar-component/sidebar-component';
import StockTableComponent from './components/stock-table-component/stock-table-component';

function App() {

  const [priceChangePct, setPriceChangePct] = useState<"4" | "10" | null>(null);

  return (
    <>
      <CssBaseline />
      
      <HeaderComponent />

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

        <SideBarComponent 
          priceChangePct={priceChangePct}
          onPriceChangePct={setPriceChangePct}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <MarketOverviewComponent />
          <StockTableComponent />
          <NewsSectionComponent />
        </Box>
      </Box>
    </>
  )
}

export default App
