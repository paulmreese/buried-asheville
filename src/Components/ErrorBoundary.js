import React, { Component } from 'react';
import MapErrorMessage from './MapErrorMessage';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <MapErrorMessage />
    }
    return this.props.children;
  }
}

export default ErrorBoundary
