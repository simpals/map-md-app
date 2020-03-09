import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LogoImg from '../../static/images/map-logo.svg';
import LogoSatelit from '../../static/images/map-logo-sputnik.svg';
import { MapCtx } from '../contexts';

const Link = styled.a`
  text-align: center;
  position: absolute;
  top: 19px;
  left: 0;
  width: 76px;
  right: 0;
  margin: auto;
  z-index: 999;
  ${({ theme: { logo } }) => logo && logo};
`;

const LogoImage = styled.img`
  width: 100%;
`;

const Logo = (props) => {
  const { style } = useContext(MapCtx);
  const {
    source,
    medium,
    campaign,
    content,
  } = props;

  let href = 'https://map.md?';
  if (source) href = href.concat(`utm_source=${source}`);
  if (medium) href = href.concat(`&utm_medium=${medium}`);
  if (campaign) href = href.concat(`&utm_campaign=${campaign}`);
  if (content) href = href.concat(`&utm_content=${content}`);

  return (
    <Link href={href} target='_blank' className='LogoLink' >
      <LogoImage src={style !== 'map' ? LogoSatelit : LogoImg} />
    </Link>
  );
};

Logo.defaultProps = {
  source: '',
  medium: '',
  campaign: '',
  content: ''
};

Logo.propTypes = {
  source: PropTypes.string,
  medium: PropTypes.string,
  campaign: PropTypes.string,
  content: PropTypes.string
};

export default Logo;
