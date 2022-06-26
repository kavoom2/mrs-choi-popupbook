import { useDidMount, useDidUpdate } from "@hooks";
import gsap from "gsap";
import { useRef } from "react";

function useMaterialAnimation(materials, state, actionProps) {
  const mapRef = useRef(new Map());

  useDidMount(() => {
    /**
     * Initialize Material
     */
    const actionProp = propSelector(state, actionProps);

    Object.entries(materials).forEach(([materialName, material]) => {
      const materialProp = actionProp[materialName] ?? {};

      Object.entries(materialProp).forEach(([propName, prop]) => {
        const { value } = prop ?? {};

        if (value) material[propName] = value;
      });
    });
  });

  useDidUpdate(() => {
    /**
     * Update Materials by state with GSAP transition
     */
    const actionProp = propSelector(state, actionProps);

    Object.entries(materials).forEach(([materialName, material]) => {
      const materialProp = actionProp[materialName] ?? {};

      Object.entries(materialProp).forEach(([propName, prop]) => {
        const { value, ...restGsapProps } = prop ?? {};

        const key = `${materialName}-${propName}`;
        const getted = mapRef.current.get(key);

        if (getted) getted.kill();

        if (value) {
          const setted = gsap.to(material, {
            [propName]: value,
            ...restGsapProps,
            onComplete: () => {
              const onCompletedGetted = mapRef.current.get(propName);
              if (onCompletedGetted === getted) mapRef.current.delete(propName);
            },
          });

          mapRef.current.set(key, setted);
        }
      });
    });
  }, [state]);
}

const propSelector = (actionName, actionProps) => actionProps[actionName] ?? {};

export default useMaterialAnimation;
