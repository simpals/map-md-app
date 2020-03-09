import React from 'react';
import PropTypes from 'prop-types';
import UserLocControl from './components/UserLocControl';
import ZoomControl from './components/ZoomControl';
import LayerControl from './components/LayerControl';
import Mode3DControl from './components/Mode3DControl';

const MapControllers = ({
  displayZoomControl,
  displayUserLocControl,
  displayLayerControl,
  display3DControl,
  disable3DSatelite,
  disable3DMode,
  mapImages,
  style
}) => (
  <>
    { displayUserLocControl && <UserLocControl /> }
    { displayZoomControl && <ZoomControl position={displayUserLocControl} /> }
    { displayLayerControl && (
      <LayerControl
        disable3DSatelite={disable3DSatelite}
        disable3DMode={disable3DMode}
        mapImages={mapImages}
      />
    )}
    { display3DControl && (
      <Mode3DControl
        disable3DSatelite={disable3DSatelite}
        position={displayLayerControl}
        disable3DMode={disable3DMode}
      />
    )}
  </>
);

MapControllers.defaultProps = {
  displayZoomControl: true,
  displayUserLocControl: true,
  displayLayerControl: true,
  display3DControl: true,
  disable3DSatelite: false,
  disable3DMode: false,
  mapImages: []
};

MapControllers.propTypes = {
  displayZoomControl: PropTypes.bool,
  displayUserLocControl: PropTypes.bool,
  displayLayerControl: PropTypes.bool,
  display3DControl: PropTypes.bool,
  style: PropTypes.string.isRequired,
  disable3DSatelite: PropTypes.bool,
  disable3DMode: PropTypes.bool,
  mapImages: PropTypes.array,
};

export default MapControllers;
