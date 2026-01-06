import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { NUST_COORDINATES, BUS_STOPS, type Route } from '../lib/data';
import { useEffect } from 'react';

interface RouteMapProps {
  route: Route;
}

// Fix for default marker icons in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [24, 35],
  iconAnchor: [12, 39],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function RouteMap({ route }: RouteMapProps) {
  // Get coordinates for route stops
  const routeStops = route.stops.map(stopName => {
    const stop = BUS_STOPS.find(s => s.name === stopName);
    return stop || BUS_STOPS[0];
  });

  const routeCoordinates = routeStops.map(stop => [stop.lat, stop.lng] as [number, number]);

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={[NUST_COORDINATES.lat, NUST_COORDINATES.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw route path */}
        <Polyline
          positions={routeCoordinates}
          color="blue"
          weight={3}
          opacity={0.7}
        />
        
        {/* Place markers for each stop */}
        {routeStops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.lat, stop.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{stop.name}</strong>
                <br />
                Stop {index + 1} of {routeStops.length}
                <br />
                <span className="text-xs text-gray-600">
                  {route.busNumber}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
