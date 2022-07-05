/* eslint-disable global-require */
import babel from 'rollup-plugin-babel';
import img from 'rollup-plugin-img';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import globals from 'rollup-plugin-node-globals';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

const cssImport = require('postcss-import');

const output = [
  {
    file: pkg.main,
    format: 'cjs'
  },
  {
    file: pkg.module,
    format: 'es'
  }
];

const commonConfig = {
  input: 'src/index.js',
  treeshake: true,
  output
};

export default (commandLineArgs) => {
  const { environment } = commandLineArgs;
  const isBrowser = environment === 'browser';

  const commonPlugins = [
    localResolve(),
    img({
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 100000
    }),
    postcss({
      plugins: [cssImport]
    }),
    // nodePolyfills(),
    babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
    commonjs({
      include: /\/node_modules\//,
    }),
    filesize()
  ];

  if (isBrowser) {
    commonConfig.output = {
      file: './dist/umd/map-md-app.js',
      format: 'umd',
      name: 'mapmdApp',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled'
      }
    };
    commonPlugins.push(globals());
  }

  commonPlugins.push(
    resolve({
      dedupe: ['react', 'react-dom', 'styled-components', 'prop-types', 'mapbox-gl'],
      preferBuiltins: false,
      browser: isBrowser
    })
  );

  if (!isBrowser) {
    commonPlugins.push(peerDepsExternal());
  }

  commonConfig.plugins = commonPlugins;

  return commonConfig;
};
