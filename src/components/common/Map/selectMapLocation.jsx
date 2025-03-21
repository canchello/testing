import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import useLocalStorage from "./useLocalstorage";
import useGeolocation from "./useGeolocation";
import { cn } from "@/libs/tailwind";

export default function SelectMapLocation({ className, onSelectLocation, defaultCoordinates }) {
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null); // Ref for map container div

  const [userPosition] = useState({
    latitude: defaultCoordinates?.[0] || 0,
    longitude: defaultCoordinates?.[1] || 0,
  });

  const [nearbyMarkers, setNearbyMarkers] = useState(defaultCoordinates || []);
  const location = useGeolocation(defaultCoordinates);

  useEffect(() => {
    if (!mapContainerRef.current) return; // Ensure map container exists

    // Destroy previous map instance if exists
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Create a new map instance
    mapRef.current = L.map(mapContainerRef.current).setView(
      [userPosition.latitude || 0, userPosition.longitude || 0], 13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    // Handle map click to add a marker
    mapRef.current.on("click", (e) => {
      const { lat: latitude, lng: longitude } = e.latlng;

      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      markerRef.current = L.marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(`lat: ${latitude.toFixed(2)}, long: ${longitude.toFixed(2)}`)
        .openPopup();

      setNearbyMarkers([{ latitude, longitude }]);
      onSelectLocation([latitude, longitude]);
    });

  }, [userPosition.latitude, userPosition.longitude]);

  useEffect(() => {
    if (!mapRef.current || !location.latitude || !location.longitude) return;

    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    userMarkerRef.current = L.marker([location.latitude, location.longitude])
      .addTo(mapRef.current)
      .bindPopup("User");

    const el = userMarkerRef.current.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }

    mapRef.current.setView([location.latitude, location.longitude]);

  }, [location, userPosition.latitude, userPosition.longitude]);

  return <div ref={mapContainerRef} id="map" className={cn("h-96 w-full", className)}></div>;
}
