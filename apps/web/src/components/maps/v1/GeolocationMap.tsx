import React, { useCallback, useMemo } from 'react';
import { GoogleMap, Marker, Polyline, Polygon, useJsApiLoader } from '@react-google-maps/api';
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';

import { Flex } from 'components/grids/v5';
import { Geolocation, GeolocationType, GeoPoint } from 'app/models/project.model';

import './GeolocationMap.scss';

const GOOGLE_MAPS_API_KEY = process.env.PUBLIC_GOOGLE_MAPS_API_KEY || '';
const DEFAULT_CENTER: GeoPoint = { lat: -17.4046357, lng: -66.0394432 };
const DEFAULT_ZOOM = 15; // ~2km across the map container
const MAX_AREA_POINTS = 4;
const MAP_CONTAINER_STYLE = { width: '100%', height: '420px' };

const GEOLOCATION_TYPES: { key: GeolocationType; label: string }[] = [
  { key: 'area', label: 'Área (4 puntos)' },
  { key: 'line', label: 'Línea' },
];

const get_center = (points: GeoPoint[]): GeoPoint => {
  if (!points || !points.length) {
    return DEFAULT_CENTER;
  }
  const total = points.reduce((acc, point) => ({
    lat: acc.lat + point.lat,
    lng: acc.lng + point.lng,
  }), { lat: 0, lng: 0 });

  return {
    lat: total.lat / points.length,
    lng: total.lng / points.length,
  };
};

interface GeolocationMapProps {
  value?: Geolocation;
  on_change: (geolocation: Geolocation) => void;
}

const GeolocationMap = ({ value, on_change }: GeolocationMapProps) => {
  if (!on_change) {
    throw new Error('on_change is undefined');
  }

  const geolocation: Partial<Geolocation> = value || {};
  const points = useMemo(() => geolocation.points || [], [geolocation.points]);
  const type = geolocation.type || 'line';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'web-constructor-google-maps',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const on_type_change = useCallback((_event: React.MouseEvent<HTMLElement>, next_type: GeolocationType | null) => {
    if (!next_type) {
      return;
    }
    on_change({ type: next_type, points: [] });
  }, [on_change]);

  const on_map_click = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) {
      return;
    }
    if (type === 'area' && points.length >= MAX_AREA_POINTS) {
      return;
    }
    const point = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    on_change({ type, points: [...points, point] });
  }, [type, points, on_change]);

  const on_marker_drag_end = useCallback((index: number, event: google.maps.MapMouseEvent) => {
    if (!event.latLng) {
      return;
    }
    const lat_lng = event.latLng;
    const next_points = points.map((point, i) => (
      i === index
        ? { lat: lat_lng.lat(), lng: lat_lng.lng() }
        : point
    ));
    on_change({ type, points: next_points });
  }, [type, points, on_change]);

  const on_remove_point = useCallback((index: number) => {
    const next_points = points.filter((_, i) => i !== index);
    on_change({ type, points: next_points });
  }, [type, points, on_change]);

  const on_clear_points = useCallback(() => {
    on_change({ type, points: [] });
  }, [type, on_change]);

  const center = useMemo(() => get_center(points), [points]);
  const can_add_point = type === 'line' || points.length < MAX_AREA_POINTS;

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="geolocation-map geolocation-map--empty">
        Configura la variable de entorno PUBLIC_GOOGLE_MAPS_API_KEY para habilitar el mapa de geolocalización.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="geolocation-map geolocation-map--empty">
        No se pudo cargar Google Maps.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="geolocation-map geolocation-map--empty">
        Cargando mapa...
      </div>
    );
  }

  return (
    <div className="geolocation-map">
      <Flex direction={Flex.H} class_name="geolocation-map__toolbar">
        <ToggleButtonGroup
          exclusive
          size="small"
          value={type}
          onChange={on_type_change}
        >
          {
            GEOLOCATION_TYPES.map((option) => (
              <ToggleButton key={option.key} value={option.key}>{option.label}</ToggleButton>
            ))
          }
        </ToggleButtonGroup>
        <Button size="small" onClick={on_clear_points} disabled={!points.length}>
          Limpiar puntos
        </Button>
      </Flex>

      <p className="geolocation-map__hint">
        {
          type === 'area'
            ? `Puntos: ${points.length} / ${MAX_AREA_POINTS}${!can_add_point ? ' — máximo alcanzado, elimina un punto para agregar otro.' : ''}`
            : `Puntos: ${points.length}`
        }
      </p>

      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={center}
        zoom={DEFAULT_ZOOM}
        onClick={on_map_click}
      >
        {
          points.map((point, index) => (
            <Marker
              key={index}
              position={point}
              label={`${index + 1}`}
              draggable
              onDragEnd={(event) => on_marker_drag_end(index, event)}
              onRightClick={() => on_remove_point(index)}
            />
          ))
        }
        {
          type === 'area' && points.length >= 3 && (
            <Polygon
              path={points}
              options={{ fillOpacity: 0.25, strokeWeight: 2 }}
            />
          )
        }
        {
          type === 'line' && points.length >= 2 && (
            <Polyline
              path={points}
              options={{ strokeWeight: 3 }}
            />
          )
        }
      </GoogleMap>

      <p className="geolocation-map__hint">
        Clic en el mapa para agregar un punto, arrastra un punto para moverlo, clic derecho sobre un punto para eliminarlo.
      </p>
    </div>
  );
};

export { GeolocationMap };
