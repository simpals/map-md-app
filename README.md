## map-md-app: http://map.md (React/UMD - mapbox-gl wrapper)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://0.0.0.0:3000](http://0.0.0.0:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn prepack`

Run your test scripts

## Development

* Generate an API key here [https://map.md/ro/api/](https://map.md/ro/api/)
* add API key to env variable API_KEY in package.json

## Contribution

Feel free to make a pull request to [https://github.com/simpals/react-point-map]

# Installation

### `npm i -S map-md-app`

### `yarn add map-md-app`

# Exported Module
```javascript
export default {
  MapApp, "Component"
  renderMapApp, "function"
  methods "Object of methods"
};
```

# Usage React

`import { MapApp } from 'map-md-app';`

`<MapApp { ...options }/>`

### Example
  ```javascript
    const [MapGL, saveMapGL] = useState(null);

    const getMapGL = (MapCtx) => {
      "You must save it somewhere e.g"
      saveMapGL(MapCtx);
    };

    const YourOptions = {
      onInit: getMapGL
    }

    <MapApp { ...YourOptions }/>
  ```

# Usage UMD projects

Add package to your config
```javascript
require.config(
  paths:
    "mapApp": "YOURPATH/map-md-app/dist/browser/map-md-app"
)
```

Define package
```javascript
define [
  "mapApp"
], (mapApp) =>
```
### Example

```javascript
mapApp.renderMapApp({ ...yourOptions })
```


## Options

```javascript
options = {
  apiKey: string, "Generate it here https://map.md/ro/api/"
  container: string, "Container where will be randered Map (e.g #root, .classRoot)"
  viewport: {
      pitch: number, "Default 0"
      bearing: number, "Default 0"
      zoom: number, "Default 10"
      minZoom: number, "Default 7"
      maxZoom: number, "Default 20"
      center: [
        number.float, "Default [28.839917, 47.0173] -- Chisinau"
        number.float
      ],
      maxBounds: [
        [
          number.float, "Default [ 24.0, 45.0 ]"
          number.float
        ],
        [
          number.float, "Default [ 32.0, 49.0 ]"
          number.float
        ]
      ],
      initialStyle: string, "Default map (map/satelite)"
  },
  mapImages: [
    { id: string, path: string},
    { id: 'example-id', path: 'example/path/to/img.png' }
  ],
  theme: { "Add your custom css to controlls"
    mode3DControl: ``,
    layerControl: ``,
    userLocControl: ``,
    zoomControl: ``,
    logo: ''
  },
  utm: {
    source: string,
    medium: string,
    campaign: string,
    content: string,
  },
  displayZoomControl: bool, "Default true"
  displayUserLocControl: bool, "Default true"
  displayLayerControl: bool, "Default true"
  display3DControl: bool, "Default true"
  disable3DSatelite: bool, "Default false"
  disable3DMode: bool, "Default false"
  init3DObjects: bool, "Default false"
  onInit: func, "receive MapGL context"
  onUserLocInit: func, "recive UserLocation context"
  portalNode: DOM_Node
}
```

## Functions

`onInit={ ( MapCtx ) => { return MapCtx } }`<br>
`onUserLocInit={ ( userLocationAPI ) => { return userLocationAPI } }`

| Functions         | Params  | Return     |
| :---------------- | ------  | ---------: |
| onInit            | MapCtx  | `Context`  |
| onUserLocInit     | userLoc | `Context`  |

## Create Context Menu (For React)

```javascript
const portalNode = document.getElementById('yourNode')

<MapApp { ...YourOptions, portalNode}>
  {
    ({MapGL}) => (
      <YourContextMenu MapGL={MapGL}>
    )
  }
</MapApp>
```


## Exported methods

| Methods                  | Params       | Docs & Params.options |
| :----------------------- | -------------| --------------------: |
| newMapMarker             | type.Object  | [Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker)|
| newMapPopup              | type.Object  | [Popup](https://docs.mapbox.com/mapbox-gl-js/api/#popup)|
| newMapLngLat             | type.Array   | [LngLat](https://docs.mapbox.com/mapbox-gl-js/api/#lnglat)|
| newMapLngLatBounds       | type.Array   | [LngLatBounds](https://docs.mapbox.com/mapbox-gl-js/api/#lnglatbounds)|
| newMapMercatorCoordinate | type.Array   | [MercatorCoordinate](https://docs.mapbox.com/mapbox-gl-js/api/#mercatorcoordinate)|

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).<br>
To learn Mapbox GL JS, check out the [Api Reference](https://docs.mapbox.com/mapbox-gl-js/api/).<br>
To learn Mapbox GL Draw Polygon custom styles, check out the [Draw course](https://bl.ocks.org/dnseminara/0790e53cef9867e848e716937727ab18).

