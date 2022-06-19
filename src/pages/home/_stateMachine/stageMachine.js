import { assign, createMachine } from "xstate";
import {
  // assetLoader,
  // home,
  intro,
  outro,
  scene,
} from "../../../lib/constants/stageMachineStates";
import {
  BOOK_END_ANIMATION,
  END_ANIMATION,
  GO_NEXT_PAGE,
  GO_NEXT_SUBTITLE,
  GO_PREV_PAGE,
  GO_PREV_SUBTITLE,
  START_ANIMATION,
  STEP,
  SUBTITLE_END_ANIMATION,
} from "../../../lib/constants/stateMachineActions";
import { subtitles } from "../../../lib/constants/subtitles";

const id = "stage";

const initial = intro;

const context = {
  // [assetLoader]: {
  //   isLoading: true,
  //   isError: false,
  // },
  // [home]: {
  //   isAnimating: false,
  //   isAnimationEnd: false,
  // },
  [intro]: {
    isAnimating: false,
    isAnimationEnd: false,
  },
  [scene]: {
    book: {
      page: -1,
      maxPages: 4,
      isAnimating: false,
    },
    subtitle: {
      curIdx: 0,
      maxIdx: 0,
      isAnimating: false,
    },
  },
  [outro]: {
    isAnimating: false,
    isAnimationEnd: false,
  },
};

const states = {
  // [assetLoader]: {
  //   on: {
  //     [STEP]: {
  //       target: home,
  //       cond: (ctx, event) =>
  //         !ctx[assetLoader].isError && !ctx[assetLoader].isLoading,
  //     },
  //     [RETRY_ASSET_LOAD]: {
  //       actions: [
  //         assign({
  //           [assetLoader]: { isLoading: true, isError: false },
  //         }),
  //       ],
  //       cond: (ctx, event) => ctx[assetLoader].isError,
  //     },
  //     [SUCCEED_ASSET_LOAD]: {
  //       actions: [
  //         assign({
  //           [assetLoader]: { isLoading: false, isError: false },
  //         }),
  //       ],
  //       cond: (ctx, event) => ctx[assetLoader].isLoading,
  //     },
  //     [FAIL_ASSET_LOAD]: {
  //       actions: [
  //         assign({
  //           [assetLoader]: { isLoading: false, isError: true },
  //         }),
  //       ],
  //       cond: (ctx, event) => ctx[assetLoader].isLoading,
  //     },
  //   },
  // },

  // [home]: {
  //   on: {
  //     [STEP]: {
  //       target: intro,
  //       cond: (ctx, event) => ctx[home].isAnimationEnd,
  //       actions: [
  //         assign({
  //           [home]: { isAnimating: false, isAnimationEnd: false },
  //         }),
  //       ],
  //     },
  //     [START_ANIMATION]: {
  //       actions: [
  //         assign({
  //           [home]: { isAnimating: true, isAnimationEnd: false },
  //         }),
  //       ],
  //     },
  //     [END_ANIMATION]: {
  //       actions: [
  //         assign({
  //           [home]: { isAnimating: false, isAnimationEnd: true },
  //         }),
  //       ],
  //     },
  //   },
  // },

  [intro]: {
    on: {
      [STEP]: {
        target: scene,
        cond: (ctx, event) => ctx[intro].isAnimationEnd,
        actions: [
          assign({
            [intro]: { isAnimating: false, isAnimationEnd: false },
          }),
        ],
      },
      [START_ANIMATION]: {
        actions: [
          assign({
            [intro]: { isAnimating: true, isAnimationEnd: false },
          }),
        ],
      },
      [END_ANIMATION]: {
        actions: [
          assign({
            [intro]: { isAnimating: false, isAnimationEnd: true },
          }),
        ],
      },
    },
  },

  [scene]: {
    on: {
      [STEP]: {
        target: outro,
        cond: (ctx, event) => ctx[scene].book.page >= ctx[scene].book.maxPages,
        actions: [
          assign({
            [scene]: {
              book: {
                page: -1,
                maxPages: 4,
                isAnimating: false,
              },
              subtitle: {
                curIdx: 0,
                maxIdx: 0,
                isAnimating: false,
              },
            },
          }),
        ],
      },

      [GO_NEXT_PAGE]: {
        cond: (ctx, event) =>
          ctx[scene].book.page < ctx[scene].book.maxPages &&
          ctx[scene].subtitle.curIdx >= ctx[scene].subtitle.maxIdx &&
          !ctx[scene].book.isAnimating,
        actions: [
          assign((ctx, event) => {
            const page = ctx[scene].book.page + 1;
            const curIdx = 0;
            const maxIdx = subtitles[page]?.length - 1 ?? 0;

            return {
              ...ctx,
              [scene]: {
                book: {
                  ...ctx[scene].book,
                  page,
                  isAnimating: true,
                },
                subtitle: {
                  ...ctx[scene].subtitle,
                  curIdx,
                  maxIdx,
                  isAnimating: true,
                },
              },
            };
          }),
        ],
      },

      [GO_PREV_PAGE]: {
        cond: (ctx, event) =>
          ctx[scene].book.page > -1 &&
          ctx[scene].subtitle.curIdx === 0 &&
          !ctx[scene].book.isAnimating,
        actions: [
          assign((ctx, event) => {
            const page = ctx[scene].book.page - 1;
            const maxIdx = subtitles[page]?.length - 1 ?? 0;
            const curIdx = maxIdx;

            return {
              ...ctx,
              [scene]: {
                book: {
                  ...ctx[scene].book,
                  isAnimating: true,
                  page,
                },
                subtitle: {
                  ...ctx[scene].subtitle,
                  curIdx,
                  maxIdx,
                  isAnimating: true,
                },
              },
            };
          }),
        ],
      },

      [GO_NEXT_SUBTITLE]: {
        cond: (ctx, event) =>
          ctx[scene].subtitle.curIdx < ctx[scene].subtitle.maxIdx &&
          !ctx[scene].subtitle.isAnimating,
        actions: [
          assign((ctx, event) => {
            const curIdx = ctx[scene].subtitle.curIdx + 1;

            return {
              ...ctx,
              [scene]: {
                ...ctx[scene],
                subtitle: {
                  ...ctx[scene].subtitle,
                  curIdx,
                  isAnimating: true,
                },
              },
            };
          }),
        ],
      },

      [GO_PREV_SUBTITLE]: {
        cond: (ctx, event) =>
          ctx[scene].subtitle.curIdx > 0 && !ctx[scene].subtitle.isAnimating,
        actions: [
          assign((ctx, event) => {
            const curIdx = ctx[scene].subtitle.curIdx - 1;

            return {
              ...ctx,
              [scene]: {
                ...ctx[scene],
                subtitle: {
                  ...ctx[scene].subtitle,
                  curIdx,
                  isAnimating: true,
                },
              },
            };
          }),
        ],
      },

      [BOOK_END_ANIMATION]: {
        cond: (ctx, event) => ctx[scene].book.isAnimating,
        actions: [
          assign({
            [scene]: (ctx, event) => ({
              ...ctx[scene],
              book: {
                ...ctx[scene].book,
                isAnimating: false,
              },
            }),
          }),
        ],
      },

      [SUBTITLE_END_ANIMATION]: {
        cond: (ctx, event) => ctx[scene].subtitle.isAnimating,
        actions: [
          assign({
            [scene]: (ctx, event) => ({
              ...ctx[scene],
              subtitle: {
                ...ctx[scene].subtitle,
                isAnimating: false,
              },
            }),
          }),
        ],
      },
    },
  },

  [outro]: {
    on: {
      [STEP]: {
        target: intro,
        cond: (ctx, event) => ctx[outro].isAnimationEnd,
        actions: [
          assign({
            [outro]: { isAnimating: false, isAnimationEnd: false },
          }),
        ],
      },
      [START_ANIMATION]: {
        actions: [
          assign({
            [outro]: { isAnimating: true, isAnimationEnd: false },
          }),
        ],
      },
      [END_ANIMATION]: {
        actions: [
          assign({
            [outro]: { isAnimating: false, isAnimationEnd: true },
          }),
        ],
      },
    },
  },
};

/**
 * Experience stage machine
 */
const stageMachine = createMachine({
  id,
  initial,
  context,
  states,
});

export default stageMachine;
