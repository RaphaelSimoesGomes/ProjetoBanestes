import { useState, useEffect } from "react";
import Papa from "papaparse";

export function useFetchCSV(url: string) {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Papa.parse<Record<string, string>>(url, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
        setIsLoading(false);
      },
      error: (err) => {
        setError("Error loading data: " + err.message);
        setIsLoading(false);
      }
    });
  }, [url]);

  return { data, isLoading, error };
}
