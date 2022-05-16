function useBookState(config = {}) {}

const defaultConfig = {
  // Ceil Plane
  sheet_ceil: {
    geometryKey: "ceil",
    materialKey: "sheet_ceil",
    enter: {
      rotation: {
        value: [0, 0, -Math.PI / 2],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 1,
        delay: 0,
        ease: "none",
      },
    },
    exit: {
      rotation: {
        value: [0, 0, 0],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 0.2,
        delay: 0,
        ease: "none",
      },
    },
  },

  // Ceil: 장식 요소
  content_back: {
    geometryKey: "back",
    materialKey: "content_back",
    enter: {
      position: {
        value: [-0.2, 4.61, 0],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 1,
        delay: 0,
        ease: "none",
      },
    },
    exit: {
      position: {
        value: [-0.02, 4.61, 0],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 0.2,
        delay: 0,
        ease: "none",
      },
    },
  },

  // Floor Plane
  sheet_floor: {
    geometryKey: "floor",
    materialKey: "sheet_floor",
    enter: {
      rotation: {
        value: [0, 0, Math.PI / 2],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 1,
        delay: 0,
        ease: "none",
      },
    },
    exit: {
      rotation: {
        value: [0, 0, 0],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 0.2,
        delay: 0,
        ease: "none",
      },
    },
  },

  // Floor: 주요 인물
  content_main: {
    geometryKey: "main",
    materialKey: "content_main",
    enter: {
      rotation: {
        value: [0, 0, -Math.PI / 2],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 1,
        delay: 0,
        ease: "none",
      },
    },
    exit: {
      rotation: {
        value: [0, 0, 0],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 0.2,
        delay: 0,
        ease: "none",
      },
    },
  },

  // Floor: 전경
  content_front: {
    geometryKey: "front",
    materialKey: "content_front",
    enter: {
      rotation: {
        value: [0, 0, -Math.PI / 2],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 1,
        delay: 0,
        ease: "none",
      },
    },
    exit: {
      rotation: {
        value: [0, 0, -Math.PI],
        delay: 0,
        ease: "none",
      },
      opacity: {
        value: 0.2,
        delay: 0,
        ease: "none",
      },
    },
  },
};

export default useBookState;
