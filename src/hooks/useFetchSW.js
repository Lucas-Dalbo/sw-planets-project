import { useEffect, useState } from 'react';

function useFetchSW(subject) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const url = `https://swapi.dev/api/${subject}`;

  useEffect(() => {
    const makeFetch = async () => {
      setLoad(true);
      try {
        const fetchResult = await fetch(url);
        const result = await fetchResult.json();
        setData(result.results);
        setError(null);
        setLoad(false);
      } catch (e) {
        setError(e);
        setLoad(false);
      }
    };
    makeFetch();
  }, [url]);

  return [{ load, data, error }];
}

export default useFetchSW;
