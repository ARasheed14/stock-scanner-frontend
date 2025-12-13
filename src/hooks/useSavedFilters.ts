import * as React from "react";
import { useAsync } from "./useAsync";
import { getUserSavedFilters } from "../services/stock-service";
import type { SavedFilter } from "../types/types";

export function useSavedFilters() {
  // TODO: gate by user auth
  const enabled = true;

  const fetchSavedFilters = React.useCallback(async () => {
    if (!enabled) return [] as SavedFilter[];

    const res = await getUserSavedFilters();
    return (res?.results ?? []) as SavedFilter[];
  }, [enabled]);

  const { data, loading, error, setData } =
    useAsync<SavedFilter[]>(fetchSavedFilters);

  return {
    savedFilters: data ?? [],
    loading: enabled ? loading : false,
    error,
    setSavedFilters: setData,
  };
}
