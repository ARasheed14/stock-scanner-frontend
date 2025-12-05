import { useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Chip, Paper, Button, Stack } from '@mui/material';
import { runScan } from '../../services/stock-service';

type StockRow = {
  id: number;
  symbol: string;
  last: number;
  changePercent: number;
  volume: number;
  exchange: string;
};

const columns: GridColDef[] = [
  { field: 'symbol', headerName: 'Symbol', width: 120 },
  { field: 'last', headerName: 'Last', width: 120, type: 'number' },
  {
    field: 'changePercent',
    headerName: 'Chg(%)',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={`${params.value}%`}
        color={params.value > 0 ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  { field: 'volume', headerName: 'Volume', width: 150 },
  { field: 'exchange', headerName: 'Exchange', width: 160 },
];

export default function StockTable() {
  const [rows, setRows] = useState<StockRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunScan = async () => {
    
    try {
      setLoading(true);
      setError(null);

      const data = await runScan();
      console.log(data.results); // this is the formatted list from FMP, also saved in Firestore

      const mappedRows: StockRow[] = data.results.map((item: any, index: number) => ({
        id: item.symbol ?? index,
        symbol: item.symbol,
        last: item.price,
        changePercent: Number(
            (item.changesPercentage ?? 0).toFixed
              ? item.changesPercentage.toFixed(2)
              : item.changesPercentage ?? 0
          ),
        volume: item.volume ?? 0,
        exchange: item.exchange
      }));

      setRows(mappedRows);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          onClick={handleRunScan}
          disabled={loading}
        >
          {loading ? 'Running scan…' : 'Run scan'}
        </Button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </Stack>

      <Paper 
        elevation={3}
        sx={{
            borderRadius: 4,
            height: '100%',
          }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          loading={loading}
          sx={{
            borderRadius: 4,
            '& .MuiDataGrid-virtualScroller': {
              borderRadius: 4,
            },
          }}
        />
      </Paper>
    </div>
  );
}