export const breakpointsMin = {
  desktopXL: 2560,
  desktopL: 1920,
  desktop: 1280,
  laptopL: 1024,
  laptop: 900,
  tablet: 600,
};

export const breakpointsMax = {
  desktopL: 2559.98,
  desktop: 1919.98,
  laptopL: 1279.98,
  laptop: 1023.98,
  tablet: 899.98,
  mobile: 599.98,
};

export const resToMin = (minBreakpoint, vertical = false) =>
  `@media (min-${vertical ? "height" : "width"}: ${minBreakpoint}px)`;

export const resToMax = (maxBreakpoint, vertical = false) =>
  `@media (max-${vertical ? "height" : "width"}: ${maxBreakpoint}px)`;
