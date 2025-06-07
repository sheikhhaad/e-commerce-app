import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data); // Debug log
        setData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error); // Debug log
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
};

export default useFetch; 