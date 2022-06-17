import { CLOSE, OPEN, PREOPEN, RESET } from "./pageStatus";
import { pageKeys } from "./scenes";

export const sceneTransitions = {
  /**
   * Page No.1
   */
  [pageKeys.PAGE_01]: {
    ceilHingeProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
    },
    contentMainProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 1.6,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
    },
    contentFrontProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 0.8,
          duration: 2.4,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 1.5,
          ease: "power3.inOut",
        },
      },
    },
    contentBackProps: {
      [RESET]: {
        position: {
          x: -0.02,
          y: 4.61,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        position: {
          x: -0.02,
          y: 4.61,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        position: {
          x: -0.3,
          y: 4.61,
          z: 0,
          delay: 2.0,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        position: {
          x: -0.02,
          y: 4.61,
          z: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
      },
    },
  },

  /**
   * Page No.2
   */
  [pageKeys.PAGE_02]: {
    ceilHingeProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
    },
    contentMainProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 1.2,
          duration: 2.4,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
    },
    contentFrontProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 0.2,
          duration: 2.8,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 1.5,
          ease: "power3.inOut",
        },
      },
    },
    contentStripeTent: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: Math.PI,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: Math.PI,
          duration: 1.0,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: (1.4 / 2) * Math.PI,
          delay: 1.4,
          duration: 1.8,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: Math.PI,
          duration: 1.0,
          ease: "power3.inOut",
        },
      },
    },
    contentStripeTentTail: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.0,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: (0.6 / 2) * Math.PI,
          delay: 3.0,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.0,
          ease: "power3.inOut",
        },
      },
    },
  },

  /**
   * Page No.3
   */
  [pageKeys.PAGE_03]: {
    ceilHingeProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
    },

    contentMainProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 1.3,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
    },

    contentFrontProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 2.3,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 2.2,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 1.5,
          ease: "power3.inOut",
        },
      },
    },
  },

  /**
   * Page No.4
   */
  [pageKeys.PAGE_04]: {
    ceilHingeProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
    },
    contentMainProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 1.2,
          duration: 2.4,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: 0,
          duration: 2.0,
          ease: "power3.inOut",
        },
      },
    },
    contentFrontProps: {
      [RESET]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI / 2,
          delay: 0.2,
          duration: 2.8,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        rotation: {
          x: 0,
          y: 0,
          z: -Math.PI,
          duration: 1.5,
          ease: "power3.inOut",
        },
      },
    },
    contentBackProps: {
      [RESET]: {
        position: {
          x: -0.02,
          y: 4.61,
          z: 0,
          duration: 0,
          ease: "none",
        },
      },
      [PREOPEN]: {
        position: {
          x: -0.02,
          y: 4.61,
          z: 0,
          duration: 2.5,
          ease: "power3.inOut",
        },
      },
      [OPEN]: {
        position: {
          x: -0.3,
          y: 4.61,
          z: 0,
          delay: 0.2,
          duration: 2.8,
          ease: "power3.inOut",
        },
      },
      [CLOSE]: {
        position: {
          x: -0.02,
          y: 4.61,
          z: 0,
          duration: 1.5,
          ease: "power3.inOut",
        },
      },
    },
  },
};
