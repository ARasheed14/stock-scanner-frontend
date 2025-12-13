import React from "react";
import { useAsync } from "./useAsync";
import { getNewsList } from "../services/stock-service";
import type { NewsItem } from "../types/types";

export function useNewsData() {
  const fetchNewsList = React.useCallback(async () => {
    const res = await getNewsList();
    return (res?.results ?? []) as NewsItem[];
  }, []);
  const { data, loading, error, setData } = useAsync<NewsItem[]>(fetchNewsList);

  return {
    newsList: data ?? [],
    loading,
    error,
    setNews: setData,
  };
}
