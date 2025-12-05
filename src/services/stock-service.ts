// src/services/httpClient.ts
const API_BASE_URL = "http://localhost:8000";

export async function runScan() {
  const res = await fetch(`${API_BASE_URL}/scan`, { method: "POST" });
  if (!res.ok) throw new Error("Scan failed");
  return res.json(); // { status, count, results: [...] }
}
