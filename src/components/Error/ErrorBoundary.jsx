import PropTypes from "prop-types";
import React from "react";
import ChunkErrorScreen from "./ChunkErrorSceen";
import CrashErrorScreen from "./CrashErrorScreen";

const isDeployed = process.env.NODE_ENV === "production";

class ErroyBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      chunkError: false,
      isOnline: false,
    };

    this.handleResolveError = this.handleResolveError.bind(this);
  }

  static getDerivedStateFromError(error) {
    if (error.name === "ChunkLoadError") {
      return {
        chunkError: true,
      };
    }

    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (isDeployed) {
      // send to Sentry
    }
  }

  handleResolveError = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.chunkError) return <ChunkErrorScreen />;

    if (this.state.hasError)
      return <CrashErrorScreen onResolve={this.handleResolveError} />;

    return this.props.children;
  }
}

ErroyBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  hasError: PropTypes.bool,
};

export default ErroyBoundary;
