// src/services/httpClient.ts
const API_BASE_URL = "http://localhost:8000";
import { MOCK_TOP_MOVERS, MOCK_INDEXES } from "../mocks/mockStocks";

const USE_MOCKS = true; // Toggle this to switch between mocks and real API

export async function runScan() {
  
  if (USE_MOCKS) return {results: MOCK_TOP_MOVERS};

  const res = await fetch(`${API_BASE_URL}/scan`, { method: "POST" });
  if (!res.ok) throw new Error("Scan failed");
  return res.json(); // { status, count, results: [...] }
}

export async function getIndexesData() {
  
  if (USE_MOCKS) return {results: MOCK_INDEXES};
  // Implement real API call when not using mocks in future
  return;
}