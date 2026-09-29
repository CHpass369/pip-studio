import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Polygon, Polyline, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

import { GeoPoint, Project } from 'app/models/project.model';

import './ProjectsOverviewMap.scss';

const GOOGLE_MAPS_API_KEY = process.env.PUBLIC_GOOGLE_MAPS_API_KEY || '';
const DEFAULT_CENTER: GeoPoint = { lat: -17.4046357, lng: -66.0394432 };
const DEFAULT_ZOOM = 6;
const MAP_CONTAINER_STYLE = { width: '100%', height: '100%', minHeight: '500px' };
const PALETTE = ['#1a73e8', '#e8710a', '#188038', '#d01884', '#7627bb', '#12b5cb', '#e52592', '#f9ab00'];

// a project that is guaranteed to have a drawable geolocation
type ShapeProject = Project & Required<Pick<Project, 'geolocation'>>;

interface HoveredProject {
  project: ShapeProject;
  position: GeoPoint;
}

const get_shape_projects = (projects: Project[]): ShapeProject[] => (
  projects.filter((project): project is ShapeProject => {
    const geolocation = project.geolocation;
    const points = geolocation && geolocation.points;
    if (!geolocation || !points || !points.length) {
      return false;
    }
    const type = geolocation.type || 'line';
    return type === 'area' ? points.length >= 3 : points.length >= 2;
  })
);

interface ProjectsOverviewMapProps {
  projects: Project[];
}

const ProjectsOverviewMap = ({ projects }: ProjectsOverviewMapProps) => {
  if (!projects) {
    throw new Error('projects is undefined');
  }

  const map_ref = useRef<google.maps.Map | null>(null);
  const [hovered, set_hovered] = useState<HoveredProject | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'web-constructor-google-maps',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const shape_projects = useMemo(() => get_shape_projects(projects), [projects]);

  const on_map_load = useCallback((map: google.maps.Map) => {
    map_ref.current = map;
  }, []);

  useEffect(() => {
    if (!map_ref.current || !window.google) {
      return;
    }

    if (!shape_projects.length) {
      map_ref.current.setCenter(DEFAULT_CENTER);
      map_ref.current.setZoom(DEFAULT_ZOOM);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    shape_projects.forEach((project) => {
      project.geolocation.points.forEach((point) => {
        bounds.extend(point);
      });
    });
    map_ref.current.fitBounds(bounds);
  }, [shape_projects]);

  const on_shape_mouse_over = useCallback((project: ShapeProject, event: google.maps.PolyMouseEvent) => {
    if (!event.latLng) {
      return;
    }
    set_hovered({
      project,
      position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
    });
  }, []);

  const on_shape_mouse_out = useCallback(() => {
    set_hovered(null);
  }, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="projects-overview-map projects-overview-map--empty">
        Configura la variable de entorno PUBLIC_GOOGLE_MAPS_API_KEY para habilitar el mapa.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="projects-overview-map projects-overview-map--empty">
        No se pudo cargar Google Maps.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="projects-overview-map projects-overview-map--empty">
        Cargando mapa...
      </div>
    );
  }

  return (
    <div className="projects-overview-map">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={on_map_load}
      >
        {
          shape_projects.map((project, index) => {
            const color = PALETTE[index % PALETTE.length];
            const type = project.geolocation.type || 'line';

            if (type === 'area') {
              return (
                <Polygon
                  key={project._id}
                  path={project.geolocation.points}
                  options={{ fillColor: color, fillOpacity: 0.3, strokeColor: color, strokeWeight: 2 }}
                  onMouseOver={(event) => on_shape_mouse_over(project, event)}
                  onMouseOut={on_shape_mouse_out}
                />
              );
            }

            return (
              <Polyline
                key={project._id}
                path={project.geolocation.points}
                options={{ strokeColor: color, strokeWeight: 3 }}
                onMouseOver={(event) => on_shape_mouse_over(project, event)}
                onMouseOut={on_shape_mouse_out}
              />
            );
          })
        }
        {
          hovered && (
            <InfoWindow position={hovered.position} onCloseClick={on_shape_mouse_out}>
              <div className="projects-overview-map__tooltip">{hovered.project.name}</div>
            </InfoWindow>
          )
        }
      </GoogleMap>
      {
        !shape_projects.length && (
          <p className="projects-overview-map__hint">
            Ninguno de los projectos cargados tiene geolocalización guardada.
          </p>
        )
      }
    </div>
  );
};

export { ProjectsOverviewMap };
