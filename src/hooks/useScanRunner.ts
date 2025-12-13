// hooks/useScanRunner.ts
import * as React from "react";
import { runScan } from "../services/stock-service";
import type { ScanResultItem } from "../types/types";

type RunScanResponse = { results: ScanResultItem[] };

export function useScanRunner() {
  const [results, setResults] = React.useState<ScanResultItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const scan = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = (await runScan()) as RunScanResponse;
      setResults(data?.results ?? []);
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Scan failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, scan, setResults };
}
