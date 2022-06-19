import { useInterpret } from "@xstate/react";
import { createContext } from "react";
import stageMachine from "./_stateMachine/stageMachine";

/**
 * React + Xstate
 * https://xstate.js.org/docs/recipes/react.html#global-state-react-context
 */

export const GlobalServiceContext = createContext({});

export const GlobalServiceProvider = (props) => {
  const stageService = useInterpret(stageMachine, { devTools: true });

  return (
    <GlobalServiceContext.Provider value={{ stageService }}>
      {props.children}
    </GlobalServiceContext.Provider>
  );
};
