import React, {
  useState, useEffect, useRef, useContext
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MapCtx } from '../../contexts';
import CompassImg from '../../../static/images/compass.svg';
import objects3DRender from '../../../Render3D/index';

const Wrapper = styled.div`
  position: absolute;
  right: 15px;
  bottom: 83px;
  ${({ theme: { compass } }) => compass && compass}
`;

const Container = styled.div``;

const Rotor = styled.span`
  display: block;
  height: 56px;
  width: 56px;
  padding: 10px;
  border-radius: 100px;
  background-image: url(${CompassImg});
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.07);
  &:hover {
    cursor: grab;
  }
  &.is-grabbing {
    cursor: grabbing;
  }
`;

const Switcher = styled.button`
  border-radius: 100px;
  display: block;
  position: absolute;
  padding: 0;
  height: 20px;
  line-height: 0;
  top: 19px;
  left: 16px;
  z-index: 200;
`;

const ModeIcon = styled.span`
  line-height: 0;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
`;

const R2D = 180 / Math.PI;

let actualStyle = null;

const Mode3DControl = ({ disable3DSatelite, position, disable3DMode }) => {
  const { MapGL, style } = useContext(MapCtx);
  const compassRef = useRef(null);
  const modeIconRef = useRef(null);
  const [isGrabbing, toggleGrabbing] = useState(false);
  const [pitchValue, changePitch] = useState(MapGL.getPitch());
  const [bearingValue, setBearingValue] = useState(0);
  actualStyle = style;

  useEffect(() => {
    const { current } = compassRef;
    MapGL.on('pitchend', (e) => {
      const pitch = e.target.getPitch();
      // changePitch(pitch);
      toggle3DRender(pitch);
    });
    MapGL.on('rotate', () => {
      const bearing = MapGL.getBearing();
      current.style.transform = `rotate(${bearing * -1}deg)`;
    });
  }, []);

  useEffect(() => {
    const { current } = compassRef;
    current.addEventListener('mousedown', onMouseDown);
    current.addEventListener('mouseup', onMouseUp);
    current.addEventListener('mousemove', compassMove);
    current.addEventListener('touchstart', compassMove);
    return () => {
      current.removeEventListener('mousedown', onMouseDown);
      current.removeEventListener('mouseup', onMouseUp);
      current.removeEventListener('mousemove', compassMove);
      current.removeEventListener('touchstart', compassMove);
    };
  });

  const onMouseDown = () => {
    const bearing = MapGL.getBearing();
    setBearingValue(bearing);
    toggleGrabbing(true);
  };

  const onMouseUp = () => {
    const { current } = compassRef;
    const bearing = MapGL.getBearing();
    if (isGrabbing && bearingValue === bearing) {
      current.style.transform = `rotate(${0}deg)`;
      MapGL.setBearing(0);
    }
    toggleGrabbing(false);
  };

  const compassMove = (e) => {
    if (!isGrabbing) return;
    const { current } = compassRef;
    const {
      top, left, height, width
    } = current.getBoundingClientRect();
    const center = {
      x: left + width / 2,
      y: top + height / 2
    };
    const x = e.clientX - center.x;
    const y = e.clientY - center.y;
    const degree = R2D * Math.atan2(y, x) + 90;
    current.style.transform = `rotate(${degree}deg)`;
    MapGL.setBearing(degree * -1);
  };

  const setPitch = () => {
    if (pitchValue > 0) {
      MapGL.flyTo({ pitch: 0 });
      changePitch(0);
      return;
    }
    MapGL.flyTo({ pitch: 60 });
    changePitch(60);
  };

  const toggle3DRender = (pitch) => {
    if (pitch > 0 && (actualStyle !== 'satelite' || !disable3DSatelite)) {
      if (!disable3DMode) objects3DRender(MapGL);
    }
  };

  const currentMode = pitchValue ? '3D' : '2D';

  return (
    <Wrapper position={position} className='Mode3DControl' >
      <Container>
        <Switcher type='button' onClick={setPitch}>
          <ModeIcon ref={modeIconRef} className={`icon-${currentMode}`} />
        </Switcher>
        <Rotor className={isGrabbing && 'is-grabbing'} ref={compassRef} />
      </Container>
    </Wrapper>
  );
};

Mode3DControl.propTypes = {
  disable3DSatelite: PropTypes.bool.isRequired,
  position: PropTypes.bool.isRequired,
  disable3DMode: PropTypes.bool.isRequired
};

export default Mode3DControl;
