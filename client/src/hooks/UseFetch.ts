/**
 * useFetch hook enables state transitions for React components during fetch promise
 */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export enum FetchStatus {
  Loading,
  Loaded,
  Error,
}

const useFetch = <T>(url: string, initialState: T, refresh?: number) => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.Loading);

  const [data, setData] = useState<T>(initialState);

  const handleError = useCallback((err) => {
    console.log(err);
    setStatus(FetchStatus.Error);
  }, []);

  const updateResource = useCallback((resp) => {
    setData(resp.data);
    setStatus(FetchStatus.Loaded);
  }, []);

  const fetchResource = useCallback(() => {
    axios.get<T>(url).then(updateResource).catch(handleError);
  }, [url, handleError, updateResource]);

  useEffect(() => {
    fetchResource();

    if (refresh) {
      const interval = setInterval(fetchResource, refresh);
      return () => clearInterval(interval);
    }
  }, [fetchResource, refresh]);

  return { status, data };
};

export default useFetch;
