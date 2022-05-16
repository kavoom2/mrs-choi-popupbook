import { useEffect, useRef } from "react";

function useDidUpdate(callback, deps = []) {
  const isMounted = useRef(false);

  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (isMounted.current) cbRef.current();

    if (!isMounted.current) isMounted.current = true;
  }, deps);
}

export default useDidUpdate;
