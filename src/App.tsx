import './App.css';
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

import HeaderComponent from './components/header-component/header-component';
import MarketOverviewComponent from './components/market-overview-component/market-overview';
import NewsSectionComponent from './components/news-section-component/news-section-component';
import SideBarComponent from './components/sidebar-component/sidebar-component';
import StockTableComponent from './components/stock-table-component/stock-table-component';

import type { MarketIndex, ScanResultItem, StockRow } from './components/types/types';
import { runScan, getIndexesData } from './services/stock-service';

function App() {

  const [priceChangePct, setPriceChangePct] = useState<"4" | "10" | null>(null);
  const [rows, setRows] = useState<StockRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [indexes, setIndexes] = useState<MarketIndex[]>([]);

  React.useEffect(() => {
    async function loadIndexes() {
      try {
        setLoading(true);
        const data = await getIndexesData();
        setIndexes(data?.results ?? []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load indexes");
      } finally {
        setLoading(false);
      }
    }

    loadIndexes();
  }, []);


  const handleRunScan = async () => {

    try {
      setLoading(true);
      setError(null);

      const data = await runScan();
      console.log(data.results); // this is the formatted list from FMP, also saved in Firestore

      const mappedRows: StockRow[] = data.results
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
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
          <MarketOverviewComponent items={indexes} />
          <StockTableComponent rows={rows} loading={loading} error={error} onRunScan={handleRunScan} />
          <NewsSectionComponent />
        </Box>
      </Box>
    </>
  )
}

export default App
