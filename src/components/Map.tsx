import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Shield } from 'lucide-react';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Sample danger zones and safe zones data
  const dangerZones = [
    {
      id: 'danger1',
      center: [77.2090, 28.6139] as [number, number], // Delhi coordinates
      name: 'High Accident Zone',
      description: 'Frequent road accidents reported',
      severity: 'high' as const
    },
    {
      id: 'danger2', 
      center: [77.2350, 28.6300] as [number, number],
      name: 'Construction Area',
      description: 'Ongoing construction work',
      severity: 'medium' as const
    }
  ];

  const safeZones = [
    {
      id: 'safe1',
      center: [77.2200, 28.6200] as [number, number],
      name: 'Police Station',
      description: 'Emergency services available'
    },
    {
      id: 'safe2',
      center: [77.2400, 28.6100] as [number, number], 
      name: 'Hospital',
      description: 'Medical facilities nearby'
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [77.2090, 28.6139], // Delhi
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        if (!map.current) return;

        // Add danger zones
        dangerZones.forEach((zone) => {
          // Add circle for danger zone
          map.current!.addSource(`danger-${zone.id}`, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: zone.center
                },
                properties: zone
              }]
            }
          });

          // Add danger zone circle
          map.current!.addLayer({
            id: `danger-circle-${zone.id}`,
            type: 'circle',
            source: `danger-${zone.id}`,
            paint: {
              'circle-radius': zone.severity === 'high' ? 100 : 70,
              'circle-color': zone.severity === 'high' ? '#ef4444' : '#f59e0b',
              'circle-opacity': 0.3,
              'circle-stroke-width': 2,
              'circle-stroke-color': zone.severity === 'high' ? '#dc2626' : '#d97706'
            }
          });

          // Add marker for danger zone
          const dangerMarker = new mapboxgl.Marker({
            element: createDangerMarker(zone.severity === 'high')
          })
            .setLngLat(zone.center)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-semibold text-sm">${zone.name}</h3>
                    <p class="text-xs text-gray-600">${zone.description}</p>
                  </div>
                `)
            )
            .addTo(map.current);
        });

        // Add safe zones
        safeZones.forEach((zone) => {
          // Add safe zone circle
          map.current!.addSource(`safe-${zone.id}`, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: zone.center
                },
                properties: zone
              }]
            }
          });

          map.current!.addLayer({
            id: `safe-circle-${zone.id}`,
            type: 'circle',
            source: `safe-${zone.id}`,
            paint: {
              'circle-radius': 80,
              'circle-color': '#22c55e',
              'circle-opacity': 0.2,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#16a34a'
            }
          });

          // Add marker for safe zone
          const safeMarker = new mapboxgl.Marker({
            element: createSafeMarker()
          })
            .setLngLat(zone.center)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-semibold text-sm">${zone.name}</h3>
                    <p class="text-xs text-gray-600">${zone.description}</p>
                  </div>
                `)
            )
            .addTo(map.current);
        });
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const createDangerMarker = (isHigh: boolean) => {
    const el = document.createElement('div');
    el.className = 'w-8 h-8 rounded-full flex items-center justify-center cursor-pointer';
    el.style.backgroundColor = isHigh ? '#dc2626' : '#d97706';
    el.innerHTML = `<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`;
    return el;
  };

  const createSafeMarker = () => {
    const el = document.createElement('div');
    el.className = 'w-8 h-8 rounded-full flex items-center justify-center cursor-pointer';
    el.style.backgroundColor = '#16a34a';
    el.innerHTML = `<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z"></path></svg>`;
    return el;
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Mapbox public token to view the safety map.
              Get yours at{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={initializeMap} className="w-full" disabled={!mapboxToken}>
              Load Safety Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Map Legend */}
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <AlertTriangle className="w-4 h-4 text-emergency" />
          <span>Danger Zones</span>
        </div>
        <div className="flex items-center space-x-1">
          <Shield className="w-4 h-4 text-safe" />
          <span>Safe Zones</span>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-lg" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
      </div>
    </div>
  );
};

export default Map;