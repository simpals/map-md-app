import { createContext } from 'react';

export const MapCtx = createContext({
  MapGL: null,
  userLocation: null,
  authorization: null,
  style: null,
  changeStyle: () => {}
});
