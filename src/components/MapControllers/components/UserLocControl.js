import React, { useContext } from 'react';
import styled from 'styled-components';
import { MapCtx } from '../../contexts';

const UserLocationWrapper = styled.div`
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.07);
  border-radius: 100px;
  width: 36px;
  height: 36px;
  top: 16px;
  right: 14px;
  & > * {
    display: inline-block;
    vertical-align: middle;
  }
  ${({ theme: { userLocation } }) => userLocation && userLocation}
`;

const MylocBtn = styled.button`
  padding: 9px 5px;
  display: inline-block;
  margin: 0;
`;

const ToolIcon = styled.span`
  font-size: 18px;
  line-height: 0;
  color: rgba(0, 0, 0, 0.54);
  &:hover,
  &.active {
    color: #ff7201;
  }
`;

const UserLocControl = () => {
  const { userLocation } = useContext(MapCtx);

  const getUserLocation = () => {
    userLocation.once('error', (e) => {
      window.alert('Position could not be determined.');
    });
    if (userLocation) {
      userLocation.trigger();
    }
  };

  return (
    <UserLocationWrapper className='UserLocControl' >
      <MylocBtn type='button' onClick={() => getUserLocation()}>
        <ToolIcon className='icon-near_me' />
      </MylocBtn>
    </UserLocationWrapper>
  );
};

export default UserLocControl;
