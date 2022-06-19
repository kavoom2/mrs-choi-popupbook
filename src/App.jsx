import { inspect } from "@xstate/inspect";
import { MainRouter } from "./routes";
import "./styles/main.css";
import "./styles/normalize.css";

/**
 * Debug Xstate
 */
inspect({
  iframe: false,
});

/**
 * Root App
 */
function App() {
  return <MainRouter />;
}

export default App;
