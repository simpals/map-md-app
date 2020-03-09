import mapboxgl from 'mapbox-gl';

export const newMapMarker = options => new mapboxgl.Marker(options);

export const newMapPopup = options => new mapboxgl.Popup(options);

export const newMapLngLat = options => new mapboxgl.LngLat(...options);

export const newMapLngLatBounds = options => new mapboxgl.LngLatBounds(...options);

export const newMapMercatorCoordinate = options => new mapboxgl.MercatorCoordinate(...options);
