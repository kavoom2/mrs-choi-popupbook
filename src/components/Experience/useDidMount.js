import { useEffect, useRef } from "react";

function useDidMount(callback) {
  const isMounted = useRef(false);

  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (!isMounted.current) cbRef.current();

    isMounted.current = true;
  }, []);
}

export default useDidMount;
