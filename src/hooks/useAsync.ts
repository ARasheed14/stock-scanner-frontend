import * as React from "react";

export function useAsync<T>(fn: () => Promise<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    console.log("[useAsync] effect ran");

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fn();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Request Failed");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fn]); // ✅ ESLint happy

  return { data, loading, error, setData };
}
