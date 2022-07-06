import mainAudio from "@assets/audios/ukulele.mp3";
import { createContext, useMemo } from "react";
import { useAudio } from "react-use";

/**
 * React + Xstate
 * https://xstate.js.org/docs/recipes/react.html#global-state-react-context
 */

export const AudioContext = createContext({});

export const AuidoContextProvider = (props) => {
  const [audio, state, controls, ref] = useAudio({
    src: mainAudio,
    autoPlay: true,
    loop: true,
  });

  const value = useMemo(
    () => ({
      audio,
      state,
      controls,
      ref,
    }),
    [audio, state, controls, ref]
  );

  return (
    <AudioContext.Provider value={value}>
      {props.children}
    </AudioContext.Provider>
  );
};
