import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import errorImage from '../../static/images/error-page-holder.svg';

const Container = styled.div`
  text-align: center;
  padding: 140px 0 70px;
  & > * {
    font-family: SF Pro Display;
  }
`;

const ErrorImage = styled.img`
  display: inline-block;
  margin-bottom: 25px;
`;

const ErrorText = styled.p`
  color: rgba(0, 0, 0, 0.4);
  margin: 10px auto;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  max-width: 450px;
`;

const Error = ({ error }) => (
  <Container>
    <ErrorImage src={errorImage} alt='error image' />
    <ErrorText>Something went wrong</ErrorText>
    <ErrorText>{`Error message: ${error}.`}</ErrorText>
  </Container>
);

Error.defaultProps = {
  error: null,
};

Error.propTypes = {
  error: PropTypes.any,
};

export default Error;
