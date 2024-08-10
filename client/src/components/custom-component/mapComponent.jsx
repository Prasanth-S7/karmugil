import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const center = [13.0827, 80.2707];
const coastalPoint = [13.0827, 80.2707];

const floodData = [
  { lat: 13.001177, lng: 80.256493, name: 'Adyar', rainfall: 4.3, hour: 6 },
  { lat: 12.999830, lng: 80.194832, name: 'Alandur', rainfall: 32.8, hour: 8 },
  { lat: 13.114317, lng: 80.148056, name: 'Ambathur', rainfall: 1.2, hour: 3 },
  { lat: 13.114317, lng: 80.148056, name: 'Ambattur', rainfall: 29.1, hour: 5 },
  { lat: 13.089136, lng: 80.209564, name: 'Anna Nagar', rainfall: 37.4, hour: 9 },
  { lat: 13.010330, lng: 80.231812, name: 'Anna University', rainfall: 24.6, hour: 7 },
  { lat: 13.012640, lng: 80.226900, name: 'Ayanavaram Taluk Office', rainfall: 19.3, hour: 2 },
  // { lat: 41.119850, lng: 0.411370, name: 'CD Hospital Tondiarpet', rainfall: 48.2, hour: 10 },
  { lat: 13.023130, lng: 80.278470, name: 'Chennai AP', rainfall: 0.4, hour: 4 },
  { lat: 13.071510, lng: 80.222250, name: 'Chennai Collectorate Building', rainfall: 15.7, hour: 11 },
  { lat: 13.054410, lng: 80.248322, name: 'Chennai Nungambakkam', rainfall: 40.9, hour: 13 },
  { lat: 13.071260, lng: 80.285316, name: 'Chennai Port Trust', rainfall: 26.5, hour: 6 },
  // { lat: 47.671340, lng: -64.950360, name: 'DGP Office', rainfall: 49.7, hour: 14 },
  { lat: 29.158070, lng: 75.755020, name: 'Gov HR Sec School MGR Nagar', rainfall: 22.3, hour: 12 },
  { lat: 14.748960, lng: 78.545330, name: 'Govt. Arts College', rainfall: 31.2, hour: 15 },
  { lat: 11.218460, lng: 79.615410, name: 'Kodambakkam', rainfall: 14.1, hour: 9 },
  { lat: 13.022859, lng: 80.252249, name: 'MYLAPORE-TRIPLICANE TALUK', rainfall: 1.6, hour: 8 },
  { lat: 13.147819, lng: 80.230988, name: 'Madhavaram', rainfall: 3.2, hour: 5 },
  { lat: 32.239632, lng: 77.188713, name: 'Manali', rainfall: 47.6, hour: 16 },
  { lat: 13.073780, lng: 80.235500, name: 'Pachaiyappa College', rainfall: 33.3, hour: 7 },
  { lat: 13.107820, lng: 80.211460, name: 'Perambur Corporation Park', rainfall: 25.1, hour: 6 },
  { lat: 12.965365, lng: 80.246109, name: 'Perungudi', rainfall: 18.4, hour: 3 },
  { lat: 13.088960, lng: 80.258620, name: 'Purasawalkam - Perambur', rainfall: 21.7, hour: 8 },
  { lat: 13.170190, lng: 80.206734, name: 'Puzhal', rainfall: 23.5, hour: 4 },
  { lat: 13.107280, lng: 80.292953, name: 'Royapuram', rainfall: 26.2, hour: 5 },
  { lat: 12.900988, lng: 80.227928, name: 'Sholinganallur', rainfall: 19.8, hour: 9 },
  { lat: 13.041456, lng: 80.252014, name: 'Teynampet', rainfall: 28.1, hour: 12 },
  { lat: 10.810090, lng: 78.676890, name: 'Thiru-Vi-Ka Nagar', rainfall: 35.6, hour: 11 },
  { lat: 13.122590, lng: 80.286308, name: 'Thiruvottiyur', rainfall: 39.3, hour: 13 },
  { lat: 13.132290, lng: 80.286682, name: 'Tondairpet', rainfall: 45.0, hour: 14 },
  { lat: 13.048472, lng: 80.177490, name: 'Valasaravakkam', rainfall: 5.7, hour: 6 },
];

// Function to check proximity to the coast
const isNearCoast = (lat, lng) => {
  const coastalDistance = L.latLng(lat, lng).distanceTo(coastalPoint);
  return coastalDistance < 10000; // 10 km
};

// Function to get elevation
const getElevation = async (lat, lng) => {
  const response = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lng}`);
  const data = await response.json();
  return data.elevation;
};

const analyzeFloodRisk = async (lat, lng, rainfall, hour, name) => {
  const coastalRisk = isNearCoast(lat, lng);
  const elevation = await getElevation(lat, lng);
  const thresholds = getThresholdsForLocation(name);
  const rainfallThreshold = thresholds[hour] || 0;

  console.log(rainfall + " " + rainfallThreshold + " " + hour)

  const riskDetails = {
    location: name,
    rainfall: rainfall,
    threshold: rainfallThreshold,
    coastalRisk: coastalRisk,
    elevation: elevation[0],
    elevationThreshold: 5, // need to be adjusted
    riskAssessment: rainfall > rainfallThreshold
  };

  return riskDetails;
};

// Define thresholds for locations
const rainfallThresholdsAdyarBesantNagarMylapore = {
  1: 0.4,
  2: 1.5,
  3: 2.1,
  4: 3,
  5: 3.3,
  6: 3.7,
  7: 4.2,
  8: 4.8,
  9: 5.1,
  10: 5.6,
  11: 6.2,
  12: 6.7,
  13: 7.1,
  14: 7.6,
  15: 8,
  16: 8.4,
  17: 8.9,
  18: 9.3,
  19: 9.8,
  20: 10.2,
  21: 10.7,
  22: 11.1,
  23: 11.6,
  24: 12,
};

const rainfallThresholdsChrompetVelacheryRoyapettah = {
  1: 0.7,
  2: 1.8,
  3: 2.7,
  4: 3.5,
  5: 3.9,
  6: 4.3,
  7: 4.8,
  8: 5.3,
  9: 5.7,
  10: 6.1,
  11: 6.7,
  12: 7.2,
  13: 7.5,
  14: 7.9,
  15: 8.4,
  16: 8.9,
  17: 9.4,
  18: 9.7,
  19: 10.2,
  20: 10.5,
  21: 10.9,
  22: 11.3,
  23: 11.8,
  24: 12.5,
};

const rainfallThresholdsAnnaNagarKotturpuramTNagarNungambakkam = {
  1: 1.1,
  2: 1.9,
  3: 3.7,
  4: 4.9,
  5: 6.0,
  6: 6.5,
  7: 6.9,
  8: 7.7,
  9: 8.9,
  10: 10.0,
  11: 11.1,
  12: 12.3,
  13: 13.5,
  14: 14.7,
  15: 15.8,
  16: 17.0,
  17: 17.8,
  18: 18.9,
  19: 20.0,
  20: 22.0,
  21: 23.7,
  22: 24.2,
  23: 24.9,
  24: 25,
};

const getThresholdsForLocation = (name) => {
  if (['Chrompet', 'Velachery', 'Royapettah'].includes(name)) {
    return rainfallThresholdsChrompetVelacheryRoyapettah;
  }
  if (['Anna Nagar', 'Kotturpuram', 'T Nagar', 'Nungambakkam'].includes(name)) {
    return rainfallThresholdsAnnaNagarKotturpuramTNagarNungambakkam;
  }
  return rainfallThresholdsAdyarBesantNagarMylapore;
};

const MapUpdater = ({ location, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, zoom);
    }
  }, [location, zoom, map]);

  return null;
};

const MapComponent = () => {
  const [floodRisks, setFloodRisks] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(center);
  const [zoom, setZoom] = useState(12);
  const str = JSON.stringify(floodRisks);
  console.log(str+ "Naa tha varen")
  useEffect(() => {
    const fetchFloodRisks = async () => {
      const risks = await Promise.all(
        floodData.map(async ({ lat, lng, rainfall, hour, name }) => {
          const risk = await analyzeFloodRisk(lat, lng, rainfall, hour, name);
          console.log(JSON.stringify(risk))
          return { lat, lng, rainfall, risk, name };
        })
      );
      setFloodRisks(risks);
    };

    fetchFloodRisks();
  }, []);

  const handleLocationChange = (event) => {
    const selectedName = event.target.value;
    const location = floodData.find(data => data.name === selectedName);
    if (location) {
      setSelectedLocation([location.lat, location.lng]);
      setZoom(15); // Zoom in when a location is selected
    }
  };

  return (
    <div>
      <select onChange={handleLocationChange} defaultValue="">
        <option value="" disabled className='text-black'>Select a location</option>
        {floodData.map(({ name }, index) => (
          <option className="text-black" key={index} value={name}>{name}</option>
        ))}
      </select>

      <MapContainer center={selectedLocation} zoom={zoom} className='w-full h-[550px]'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {floodRisks.map(({ lat, lng, rainfall, risk }, index) => (

          <><Circle
            key={index}
            center={[lat, lng]}
            radius={200}
            color={risk.riskAssessment ? 'red' : 'green'}
            fillColor={risk.riskAssessment ? 'red' : 'green'}
            fillOpacity={0.5}
          >
            <Popup>
              Rainfall: {rainfall} cm<br />
              Threshold: {risk.threshold} cm<br />
              Coastal Risk: {risk.coastalRisk ? 'Yes' : 'No'}<br />
              Elevation: {risk.elevation} m<br />
              Elevation Threshold: {risk.elevationThreshold} m<br />
              Risk Assessment: {risk.riskAssessment ? 'High' : 'Low'}

            </Popup>
          </Circle>
          </>
        ))}
        {floodData.map(({ lat, lng, name }, index) => (
          <Marker key={index} position={[lat, lng]}>
            <Popup>{name}</Popup>
          </Marker>
        ))}
        <MapUpdater location={selectedLocation} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;