import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        // eslint-disable-next-line no-shadow
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [options, url]);
  return { response, error };
};

export default useFetch;
