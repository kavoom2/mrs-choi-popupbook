import { useCallback, useRef } from "react";

function useArrayRef() {
  const refs = useRef([]);

  const setRefs = useCallback(
    (index) => (ref) => {
      if (refs.current) {
        refs.current[index] = {
          current: ref,
        };
      }
    },
    []
  );

  return [refs, setRefs];
}

export default useArrayRef;
