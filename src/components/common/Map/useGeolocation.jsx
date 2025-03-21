import { useEffect, useState } from "react";

export default function useGeolocation({ defaultCoordinates } = {}) {
  const [position, setPosition] = useState({
    latitude: defaultCoordinates?.[0] || 32.883002,
    longitude: defaultCoordinates?.[1] || 13.147136,
  });

  useEffect(() => {
    if (position.latitude || position.longitude) return
    const geo = navigator.geolocation;

    function onSuccess(position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function onError(error) {
      console.error("Error retrieving geolocation:", error);
    }

    const watcher = geo.watchPosition(onSuccess, onError);

    return () => geo.clearWatch(watcher);
  }, []);

  return position;
}
