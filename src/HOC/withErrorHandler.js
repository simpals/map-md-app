import React, { PureComponent } from 'react';
import Error from '../components/Error';

const withErrorHandler = (Component) => {
  class WithErrorHandler extends PureComponent {
    state = {
      error: false,
      errorInfo: 'An Unexpected Error Occurred'
    };

    static getDrivedStateFromError() {
      return { error: true };
    }
    
    componentDidCatch(_error, info) {
      console.warn(_error, info);
      this.setState({ error: true, errorInfo: info.componentStack });
    }
  
    render() {
      const { error, errorInfo } = this.state;
      if (error) return <Error error={errorInfo} />;
      return <Component {...this.props} />;
    }
  }

  return WithErrorHandler;
};

export default withErrorHandler;
