import * as React from "react";
import { useAsync } from "./useAsync";
import { getIndexesData } from "../services/stock-service";
import type { MarketIndex } from "../types/types";

export function useIndexesData() {
  const fetchIndexes = React.useCallback(async () => {
    const res = await getIndexesData();
    return (res?.results ?? []) as MarketIndex[];
  }, []);

  const { data, loading, error, setData } = useAsync<MarketIndex[]>(fetchIndexes);

  return {
    indexes: data ?? [],
    loading,
    error,
    setIndexes: setData,
  };
}
