import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withErrorHandler from './HOC/withErrorHandler';
import Error from './components/Error';
import Loading from './components/Loading';
import Map from './components/Map';
import Theme from './Theme';
import { MAP_STYLE, DEFAULT_VIEWPORT } from './constants';

const MainWrapper = styled.div`
  height: 100%;
  position: relative;
  box-sizing: border-box;

  & > a,
  button,
  img {
    border: none;
    outline: none;
    text-decoration: none;
    background: none;
    color: inherit;
  }

  & a,
  button {
    cursor: pointer;
  }

  & * {
    box-sizing: border-box;
  }
`;

const App = (props) => {
  const { apiKey, theme, ...rest } = props;
  const settings = rest;
  const { viewport } = settings;
  const { OPTIONS, URL } = MAP_STYLE;
  const setApiKey = apiKey;
  const ENCODE = Buffer.from(`${setApiKey}:map`).toString('base64');
  const AUTHORIZATION = `Basic ${ENCODE}`;
  OPTIONS.headers.authorization = AUTHORIZATION;
  settings.viewport = !viewport ? DEFAULT_VIEWPORT : { ...DEFAULT_VIEWPORT, ...viewport };

  const [style, setStyle] = useState(null);
  const [error, setError] = useState(false);
  const { initialStyle } = settings.viewport;

  useEffect(() => {
    if (!apiKey) {
      // eslint-disable-next-line max-len
      console.warn('apiKey is not provided, please add your own key');
    }
    const fetchMapStyles = async () => {
      try {
        const req = await fetch(URL[initialStyle], OPTIONS);
        const data = await req.json();
        if (data.id) {
          setStyle(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err);
      }
    };
    fetchMapStyles();
  }, []);

  const DisplayMap = () => {
    if (error) return <Error error={error} />;
    if (!style) return <Loading />;
    return <Map {...settings} mapStyles={style} authorization={AUTHORIZATION} />;
  };

  return (
    <Theme theme={theme}>
      <MainWrapper>
        <DisplayMap />
      </MainWrapper>
    </Theme>
  );
};

App.defaultProps = {
  apiKey: null,
  viewport: DEFAULT_VIEWPORT,
  theme: {}
};

App.propTypes = {
  apiKey: PropTypes.string,
  theme: PropTypes.object,
  viewport: PropTypes.shape({
    pitch: PropTypes.number,
    bearing: PropTypes.number,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    center: PropTypes.array,
    maxBounds: PropTypes.array,
    initialStyle: PropTypes.string,
  })
};

export default withErrorHandler(App);
