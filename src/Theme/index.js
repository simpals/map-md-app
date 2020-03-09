
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const Theme = ({ theme, children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Theme;
