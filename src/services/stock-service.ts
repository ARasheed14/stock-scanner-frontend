import { MOCK_TOP_MOVERS, MOCK_INDEXES, MOCK_NEWS, MOCK_SAVED_FILTERS } from "../mocks/mockStocks";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCKS = true; // Toggle this to switch between mocks and real API

export async function runScan() {

  if (USE_MOCKS) return { results: MOCK_TOP_MOVERS };

  const res = await fetch(`${API_BASE_URL}/scan`, { method: "POST" });
  if (!res.ok) throw new Error("Scan failed");
  return res.json(); // { status, count, results: [...] }
}

export async function getIndexesData() {

  if (USE_MOCKS) return { results: MOCK_INDEXES };
  // Implement real API call when not using mocks in future
  return;
}

export async function getNewsList() {

  if (USE_MOCKS) return { results: MOCK_NEWS };
  // Implement real API call when not using mocks in future
  return;
}

export async function getUserSavedFilters() {

  if (USE_MOCKS) return { results: MOCK_SAVED_FILTERS };
  // Implement real API call when not using mocks in future
  return;
}