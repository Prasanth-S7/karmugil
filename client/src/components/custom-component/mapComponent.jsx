import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat:20.93333000,
  lng:77.75000000,
};

const MapComponent = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDA8mk9jotn1DoZzcyylgRe5O7s-EquTSY",
      version: "weekly",
      libraries: ["maps"],
      
    });

    const loadMap = async () => {
      try {
        await loader.load();
        const { AdvancedMarkerElement } = await loader.importLibrary("marker");

        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 5,
          mapId:"Map_Id"
        });

        locations.forEach((location) => {
          const [lng, lat] = location.centroid.split(',').map(Number);
          new AdvancedMarkerElement({
            position: { lat, lng },
            title: location.warning_message,
            map,
          });
        });
      } catch (error) {
        console.error('Error loading Google Maps', error);
      }
    };

    loadMap();
  }, [locations]);

  return (
    <div style={containerStyle} ref={mapRef} />
  );
};

export default MapComponent;
