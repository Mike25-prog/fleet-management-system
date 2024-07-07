import React, { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import './Map.css';
const Map = () => {
    const centerEldoret = { lat: 0.5149, lng: 35.2698 };
    const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    
});
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
  }, [map]);

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={centerEldoret}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={
            {
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
                scaleControl: true,
                rotateControl: true,
                clickableIcons: false,
                gestureHandling: 'greedy',
                scrollwheel: true,
                draggable: true,
            }
        }
      >
        {/* Traffic layer is added via useEffect */}
      </GoogleMap>
    </div>
  );
};

export default Map;
