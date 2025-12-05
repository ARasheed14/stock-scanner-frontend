# 📈 Stock Scanner Frontend

A React-based frontend for scanning and visualizing stock market movements.  
This application connects to a FastAPI backend that retrieves stock data from an external API, processes it, saves it to Firestore, and returns formatted results.

---

## 🚀 Features

- **Trigger Stock Scan**  
  Initiates a scan via the backend's `POST /scan` endpoint.
  
- **FastAPI-Powered Backend**  
  The backend fetches stock data from the external API, formats it, saves it to Firestore, and returns the results.

- **Interactive Data Grid (MUI)**  
  Displays stock symbols, last price, percentage change, volume, and exchange.

- **Clean Architecture**  
  UI components and API service logic are kept separate for clarity and scalability.

---

## 🧱 Tech Stack

### **Frontend**
- React (TypeScript)
- MUI & MUI X (DataGrid)
- Vite (or CRA—depending on your setup)
- Fetch API for backend requests

### **Backend**
- FastAPI (Python)
- Firestore database
- External Stock API (FMP or others)

---

## 📂 Project Structure

/src
/components
StockTable.tsx # Main DataGrid component
/services
stock-service.ts # Calls the FastAPI backend

---

## 🔌 Backend Setup

The app expects a FastAPI backend running at:

`http://localhost:8000`

The backend must expose:

### `POST /scan`

**Example response:**

```json
{
  "status": "ok",
  "count": 20,
  "results": [
    {
      "symbol": "AAPL",
      "price": 189.20,
      "changesPercentage": 2.41,
      "volume": 55392000,
      "exchange": "NASDAQ"
    }
  ]
}
```

🖥️ Running the Frontend

Install dependencies:
`npm install`

Start development server:
`npm run dev`

The app will open at:
`http://localhost:5173`
(or http://localhost:3000 depending on your setup)

📊 UI Preview
The main table displays:

Symbol

Last Price

Percent Change (colored chips)

Volume

Exchange

Users can click Run Scan to execute a full stock scan and populate the table.

🛠️ Development Workflow

Start backend (FastAPI):
`uvicorn scanner.stock_scanner:app --reload`

Start frontend:
`npm run dev`

Trigger a scan:
Click Run Scan to call the backend, fetch stock data, and update the grid.

📦 Build for Production
`npm run build`

The production build will be output to the dist/ folder.