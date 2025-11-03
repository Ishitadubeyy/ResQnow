import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = navigator.geolocation.watchPosition(
      (pos) => setPosition(pos.coords),
      (err) => setError(err.message)
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { position, error };
}
