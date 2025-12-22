import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

import SignInPage from './pages/sign-in-page/sign-in-page';
import SignUpPage from './pages/sing-up-page/sign-up-page';

import HeaderComponent from './components/header-component/header-component';
import MarketOverviewComponent from './components/market-overview-component/market-overview';
import NewsSectionComponent from './components/news-section-component/news-section-component';
import SideBarComponent from './components/sidebar-component/sidebar-component';
import StockTableComponent from './components/stock-table-component/stock-table-component';

import type { ScanResultItem, StockRow } from './types/types';
import { useIndexesData } from './hooks/useIndexesData';
import { useNewsData } from './hooks/useNewsData';
import { useSavedFilters } from './hooks/useSavedFilters';
import { useScanRunner } from './hooks/useScanRunner';

function App() {

  const [priceChangePct, setPriceChangePct] = useState<"4" | "10" | null>(null);
  const [rows, setRows] = useState<StockRow[]>([]);

  const { indexes, loading: indexesLoading } = useIndexesData();
  const { newsList, loading: newsLoading } = useNewsData();

  const { savedFilters, loading: savedFiltersLoading, error: savedFiltersErrors, setSavedFilters } = useSavedFilters();
  const { loading: scanLoading, error: scanError, scan } = useScanRunner();
  ;
  const onDeleteFilter = (id: string) => {
    // UI-only delete for now; later swap to service call + refetch
    setSavedFilters((prev) => (prev ?? []).filter((f) => f.id !== id));
  };


  const handleRunScan = async () => {
    try {
      const data = await scan();

      const mappedRows: StockRow[] = (data.results ?? [])
        .filter((item: ScanResultItem) => item.symbol)
        .map((item: ScanResultItem) => ({
          id: item.symbol,
          symbol: item.symbol,
          last: item.price,
          changePercent: Number(
            item.changesPercentage?.toFixed
              ? item.changesPercentage.toFixed(2)
              : item.changesPercentage ?? 0
          ),
          volume: item.volume ?? 0,
          exchange: item.exchange,
          ...(typeof item.floatShares === 'number' ? { floatShares: item.floatShares } : {}),
        }));

      setRows(mappedRows);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CssBaseline />

      <HeaderComponent />

      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />

        <Route path="/search" element={
          <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

            <SideBarComponent
              priceChangePct={priceChangePct}
              onPriceChangePct={setPriceChangePct}
              savedFilters={savedFilters}
              onDeleteFilter={onDeleteFilter}
              loading={savedFiltersLoading}
              error={savedFiltersErrors}
            />

            <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
              <MarketOverviewComponent items={indexes} loading={indexesLoading} />
              <StockTableComponent rows={rows} loading={scanLoading} error={scanError} onRunScan={handleRunScan} />
              <NewsSectionComponent items={newsList} loading={newsLoading} />
            </Box>
          </Box>
        } />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
}

export default App
