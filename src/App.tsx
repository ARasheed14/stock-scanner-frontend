import './App.css'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'

import StockTable from './components/data-grid-component/data-grid-component'

function App() {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Top Movers
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <StockTable />
      </Container>
    </>
  )
}

export default App
