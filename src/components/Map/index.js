import React, { useEffect, useState, Fragment } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import objects3DRender from '../../Render3D';
import MapControllers from '../MapControllers';
import Logo from '../Logo';
import { MapCtx } from '../contexts';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../../static/css/index.css';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const setAuthHeader = (url, authorization) => {
  if (url.indexOf('google') > -1) {
    return { url };
  }
  return {
    url,
    headers: {
      Authorization: authorization
    }
  };
};

const Map = (props) => {
  const {
    mapStyles,
    authorization,
    viewport,
    onInit,
    onUserLocInit,
    portalNode,
    init3DObjects,
    disable3DMap,
    children,
    mapImages,
    utm,
    ...rest
  } = props;

  const {
    pitch,
    bearing,
    zoom,
    minZoom,
    maxZoom,
    center,
    maxBounds: [[S, W], [N, E]],
    initialStyle
  } = viewport;

  const [MapGL, setMapGL] = useState(null);
  const [userLocation, setUserLocationApi] = useState(null);
  const [currentStyle, setStyle] = useState(initialStyle);
  const changeCurentStyle = newStyle => setStyle(newStyle);

  const mapOnLoad = (map) => {
    map.once('load', () => {
      onInit(map);
    });
  };

  const initUserLocation = (mapCtx) => {
    const userLocationAPI = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    mapCtx.addControl(userLocationAPI, 'top-left');
    setUserLocationApi(userLocationAPI);
    onUserLocInit(userLocationAPI);
  };

  const initMap = () => {
    const southWest = new mapboxgl.LngLat(S, W);
    const northEast = new mapboxgl.LngLat(N, E);
    const bounds = new mapboxgl.LngLatBounds(southWest, northEast);
    const map = new mapboxgl.Map({
      container: 'map-app-container',
      style: mapStyles,
      center,
      maxBounds: bounds,
      zoom,
      minZoom,
      maxZoom,
      pitch,
      bearing,
      fadeDuration: 0,
      transformRequest: url => setAuthHeader(url, authorization)
    });
    map.touchZoomRotate.enable();
    initUserLocation(map);
    mapOnLoad(map);
    setMapGL(map);
    mapImages.map((image) => {
      const { id, path } = image;
      map.loadImage(path, (_, imageFile) => {
        if (!map.hasImage(id) && imageFile) map.addImage(id, imageFile);
      });
    });
    if (init3DObjects && !disable3DMap) objects3DRender(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <Fragment>
      <MapContainer id='map-app-container' />
      <MapCtx.Provider
        value={{
          MapGL,
          userLocation,
          authorization,
          style: currentStyle,
          changeStyle: changeCurentStyle
        }}
      >
        <Logo {...utm} />
        {MapGL && userLocation && (
          <MapControllers {...rest} disable3DMap={disable3DMap} style={initialStyle} mapImages={mapImages} />
        )}
        {MapGL && portalNode && !!children && createPortal(children({ MapGL }), portalNode)}
      </MapCtx.Provider>
    </Fragment>
  );
};

Map.defaultProps = {
  onInit: () => {},
  onUserLocInit: () => {},
  portalNode: null,
  children: null,
  init3DObjects: false,
  disable3DMap: false,
  mapImages: [],
  utm: {}
};

Map.propTypes = {
  authorization: PropTypes.string.isRequired,
  mapStyles: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired,
  onInit: PropTypes.func,
  onUserLocInit: PropTypes.func,
  portalNode: PropTypes.instanceOf(React.Element),
  children: PropTypes.func,
  init3DObjects: PropTypes.bool,
  disable3DMap: PropTypes.bool,
  mapImages: PropTypes.array,
  utm: PropTypes.object
};

export default Map;
