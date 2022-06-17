import { pageMaterialNames } from "./materials";
import { CLOSE, OPEN, PREOPEN, RESET } from "./pageStatus";
import { pageKeys } from "./scenes";

export const materialTransitions = {
  /**
   * Page No.1
   */
  [pageKeys.PAGE_01]: {
    [RESET]: {
      [pageMaterialNames.sheet_ceil]: {
        opacity: {
          value: 1,
          duration: 0,
          ease: "none",
        },
      },
      [pageMaterialNames.sheet_floor]: {
        opacity: {
          value: 1,
          duration: 0,
          ease: "none",
        },
      },
    },
    [PREOPEN]: {
      [pageMaterialNames.sheet_ceil]: {
        opacity: {
          value: 1,
          duration: 0,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.sheet_floor]: {
        opacity: {
          value: 1,
          duration: 0,
          ease: "power3.inOut",
        },
      },
    },
    [OPEN]: {
      [pageMaterialNames.sheet_ceil]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.sheet_floor]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
    },
    [CLOSE]: {
      [pageMaterialNames.sheet_ceil]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.sheet_floor]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
    },
  },

  /**
   * Page No.2
   */
  [pageKeys.PAGE_02]: {
    [RESET]: {
      [`${pageMaterialNames.sheet_ceil}_02`]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
      [pageMaterialNames.ceil_stripetent_tail]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
      [pageMaterialNames.ceil_stripetent]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
      [`${pageMaterialNames.sheet_floor}_02`]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
    },
    [PREOPEN]: {
      [`${pageMaterialNames.sheet_ceil}_02`]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.ceil_stripetent_tail]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.ceil_stripetent]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_02`]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
    },
    [OPEN]: {
      [`${pageMaterialNames.sheet_ceil}_02`]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.ceil_stripetent_tail]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.ceil_stripetent]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_02`]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
    },
    [CLOSE]: {
      [`${pageMaterialNames.sheet_ceil}_02`]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.ceil_stripetent_tail]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
      [pageMaterialNames.ceil_stripetent]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_02`]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
    },
  },

  /**
   * Page No.3
   */
  [pageKeys.PAGE_03]: {
    [RESET]: {
      [`${pageMaterialNames.sheet_ceil}_03`]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
      [`${pageMaterialNames.sheet_floor}_3`]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
    },
    [PREOPEN]: {
      [`${pageMaterialNames.sheet_ceil}_03`]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_3`]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
    },
    [OPEN]: {
      [`${pageMaterialNames.sheet_ceil}_03`]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_3`]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
    },
    [CLOSE]: {
      [`${pageMaterialNames.sheet_ceil}_03`]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_3`]: {
        opacity: {
          value: 0.2,
          delay: 1.6,
          duration: 0.8,
          ease: "power3.inOut",
        },
      },
    },
  },

  /**
   * Page No.4
   */
  [pageKeys.PAGE_04]: {
    [RESET]: {
      [`${pageMaterialNames.sheet_ceil}_04`]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
      [`${pageMaterialNames.sheet_floor}_04`]: {
        opacity: {
          value: 0.2,
          duration: 0,
          ease: "none",
        },
      },
    },
    [PREOPEN]: {
      [`${pageMaterialNames.sheet_ceil}_04`]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_04`]: {
        opacity: {
          value: 0.2,
          delay: 1.2,
          duration: 1.2,
          ease: "power3.inOut",
        },
      },
    },
    [OPEN]: {
      [`${pageMaterialNames.sheet_ceil}_04`]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_04`]: {
        opacity: {
          value: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
      },
    },
    [CLOSE]: {
      [`${pageMaterialNames.sheet_ceil}_04`]: {
        opacity: {
          value: 1,
          delay: 0,
          duration: 0,
          ease: "power3.inOut",
        },
      },
      [`${pageMaterialNames.sheet_floor}_04`]: {
        opacity: {
          value: 1,
          delay: 0,
          duration: 0,
          ease: "power3.inOut",
        },
      },
    },
  },
};
