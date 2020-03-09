import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MapCtx } from '../../contexts';
import { MAP_STYLE } from '../../../constants';
import objects3DRender from '../../../Render3D';

import viewTypeIcons from '../../../static/images/view-type-icons.png';

const Wrap = styled.div`
  position: absolute;
  right: 15px;
  bottom: 13px;
  z-index: 100;
  ${({ theme: { layerSwitcher } }) => layerSwitcher && layerSwitcher}
`;

const Switcher = styled.a`
  cursor: pointer;
  display: inline-block;
  width: 55px;
  height: 55px;
  margin-left: 10px;
  border: 3px solid #fff;
  border-radius: 50%;
  background-image: url(${viewTypeIcons});
  background-position: ${({ layer }) => (layer === 'satelite' ? '0px' : '-49px')} 0px;
`;

const LayerControl = ({ disable3DSatelite, disable3DMode, mapImages }) => {
  const { OPTIONS, URL } = MAP_STYLE;
  const {
    MapGL, authorization, style, changeStyle
  } = useContext(MapCtx);
  const [layer, setLayer] = useState(style);
  OPTIONS.headers.authorization = authorization;

  const mapGetData = async (nextLayer) => {
    const styleReq = await fetch(URL[nextLayer], OPTIONS);
    const mapStyles = await styleReq.json();
    const initialSource = MapGL.getStyle().sources;
    MapGL.getStyle()
      .layers.slice(0)
      .reduceRight((acc, mapLayer, _, originArr) => {
        if (!mapLayer.id.match(/(vector-|raster-)/)) {
          acc.push(mapLayer);
        } else {
          mapStyles.layers.push(...acc.reverse());
          originArr.splice(0);
        }
        return acc;
      }, []);
    Object.keys(initialSource).map((source) => {
      if (initialSource[source].type !== 'vector' && initialSource[source].type !== 'raster') {
        mapStyles.sources[source] = initialSource[source];
      }
      return null;
    });
    return Promise.resolve(mapStyles);
  };

  const changeLayer = async (currentLayer, nextLayer) => {
    if (currentLayer === nextLayer) return;
    const mapData = await mapGetData(nextLayer);
    MapGL.setStyle(mapData, { diff: false });
    mapImages.map((image) => {
      const { id, path } = image;
      MapGL.loadImage(path, (_, imageFile) => {
        if (!MapGL.hasImage(id) && imageFile) MapGL.addImage(id, imageFile);
      });
    });
    MapGL.once('styledata', () => {
      if (MapGL.getPitch() <= 0 || (nextLayer === 'satelite' && disable3DSatelite)) return;
      if (!disable3DMode) objects3DRender(MapGL);
    });
    setLayer(nextLayer);
    changeStyle(nextLayer);
  };

  const nextLayer = layer === 'satelite' ? 'map' : 'satelite';

  return (
    <Wrap className='LayerControl' >
      <Switcher onClick={() => changeLayer(layer, nextLayer)} layer={layer} />
    </Wrap>
  );
};

LayerControl.propTypes = {
  disable3DSatelite: PropTypes.bool.isRequired,
  disable3DMode: PropTypes.bool.isRequired,
  mapImages: PropTypes.array.isRequired
};

export default LayerControl;
