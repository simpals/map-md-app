import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MapCtx } from '../../contexts';

const Wrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 73px;
  margin: auto;
  width: 36px;
  height: 77px;
  border-radius: 19.5px;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 100;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.07);
  ${({ position }) => (!position ? 'top: 16px' : '')}
  ${({ theme: { zoomControl } }) => zoomControl && zoomControl}
`;

const ZoomBtn = styled.button`
  display: block;
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50%;
  &:active {
    background: #fcfcfc;
  }
`;

const Separator = styled.span`
  width: 18px;
  height: 1px;
  background-color: #ededed;
  display: block;
  margin: 0 auto;
`;

const ZoomIconPlus = styled.span`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
`;

const ZoomIconMinus = styled.span`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
`;

const ZoomControl = ({ position }) => {
  const { MapGL } = useContext(MapCtx);

  const zoomIn = () => {
    const nextZoom = MapGL.getZoom() + 1;
    MapGL.zoomTo(nextZoom, null, { type: 'some' });
  };

  const zoomOut = () => {
    const nextZoom = MapGL.getZoom() - 1;
    MapGL.zoomTo(nextZoom, null, { type: 'some' });
  };

  return (
    <Wrapper position={position} className='ZoomControl' >
      <ZoomBtn type='button' onClick={zoomIn}>
        <ZoomIconPlus className='icon-add' />
      </ZoomBtn>
      <Separator />
      <ZoomBtn type='button' onClick={zoomOut}>
        <ZoomIconMinus className='icon-remove' />
      </ZoomBtn>
    </Wrapper>
  );
};

ZoomControl.propTypes = {
  position: PropTypes.bool.isRequired
};

export default ZoomControl;
