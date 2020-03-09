import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import LogoImg from '../../static/images/map-logo.svg';

const genAnimationDelay = () => {
  let style = '';
  for (let i = 1; i <= 5; i += 1) {
    style += `
    &.rect${i} {
      -webkit-animation-delay: ${-1.3 + (i / 10)}s;
      animation-delay: ${-1.3 + (i / 10)}s;
    }
    `;
  }
  return css`${style}`;
};

const MainWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Wrap = styled.div`
  margin: auto;
  width: 50px;
  height: 70px;
  text-align: center;
  font-size: 10px;
`;

const stretchDelay = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
`;

const Rect = styled.div`
  background-color: #ff7201;
  margin: 0 1.5px;
  height: 100%;
  width: 6px;
  display: inline-block;
  animation: ${stretchDelay} 1.2s infinite ease-in-out;
  ${genAnimationDelay()}
`;

const Logo = styled.img`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  z-index: 999;
`;

const Loading = () => (
  <MainWrap>
    <Logo src={LogoImg} />
    <Wrap>
      <Rect className='rect1' />
      <Rect className='rect2' />
      <Rect className='rect3' />
      <Rect className='rect4' />
      <Rect className='rect5' />
    </Wrap>
  </MainWrap>
);

export default Loading;
