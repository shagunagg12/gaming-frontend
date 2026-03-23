import React, { useState, useEffect } from 'react';
import API_LIVE_DATA_TEST from '../../../API_LIVE_DATA_TEST';

const UserCountry: React.FC = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_ACCESS_TOKEN
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://ipinfo.io?token=${IPINFO_API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch country');
        }
        const data = await response.json();
        setCountry(data.country); // Example: "US"
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User's Country</h1>
      <p>{country ? `User's country is: ${country}` : 'Country not available'}</p>
    </div>
  );
};

export default UserCountry;
