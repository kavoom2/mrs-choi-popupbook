import PropTypes from "prop-types";
import { animationStateTypes } from "./types";

export const transitionStatesPropTypes = PropTypes.arrayOf(
  PropTypes.oneOf([
    animationStateTypes.reset,
    animationStateTypes.preOpen,
    animationStateTypes.open,
    animationStateTypes.close,
  ])
).isRequired;

export const sceneBgPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    bottomColor: PropTypes.any.isRequired,
    topColor: PropTypes.any.isRequired,
    contactShadowColor: PropTypes.any.isRequired,
  })
).isRequired;
