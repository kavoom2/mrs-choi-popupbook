import PropTypes from "prop-types";
import React from "react";
import ChunkErrorSceen from "./ChunkErrorSceen";
import CrashErrorScreen from "./CrashErrorScreen";

const isDeployed = process.env.NODE_ENV === "production";

// TODO: ChunkErrorScreen, CrashErrorScreen을 단순한 Retry 버튼이 있는 페이지 컴포넌트로 재작업합니다.

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
    if (this.state.chunkError) return <ChunkErrorSceen />;

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
