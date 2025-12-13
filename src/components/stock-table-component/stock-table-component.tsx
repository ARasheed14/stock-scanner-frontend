import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Chip, Paper, Button, Stack } from '@mui/material';
import type { StockRow } from '../types/types';

export type StockTableProps = {
    rows: StockRow[];
    loading: boolean;
    error: string | null;
    onRunScan: () => void;
}

const columns: GridColDef[] = [
  { field: 'symbol', headerName: 'Symbol', width: 120, type: 'string' },
  { field: 'last', headerName: 'Last', width: 120, type: 'number' },
  {
    field: 'changePercent',
    headerName: 'Chg(%)',
    width: 120,
    type: 'number',
    renderCell: (params) => (
      <Chip
        label={`${params.value}%`}
        color={params.value > 0 ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  { field: 'volume', headerName: 'Volume', width: 150, type: 'number' },
  { field: 'exchange', headerName: 'Exchange', width: 160, type: 'string' },
  { field: 'floatShares', headerName: 'Float', minWidth: 160, flex: 1, type: 'number', renderCell: (params) =>
    typeof params.value === 'number'
      ? params.value.toLocaleString()
      : '', 
    }
];

export default function StockTableComponent({ rows, loading, error, onRunScan }: StockTableProps) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          onClick={onRunScan}
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