import mainAudio from "@assets/audios/ukulele.mp3";
import { createContext, useMemo } from "react";
import { useAudio } from "react-use";
import { useDidMount } from "rooks";

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
    volume: 0.1,
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

  useDidMount(() => {
    controls.volume(0.25);
  });

  return (
    <AudioContext.Provider value={value}>
      {props.children}
    </AudioContext.Provider>
  );
};
