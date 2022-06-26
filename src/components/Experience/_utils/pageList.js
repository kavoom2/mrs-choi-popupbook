import { pageKeys } from "@lib/constants/scenes";
import Page_01 from "../bookPages/Page_01";
import Page_02 from "../bookPages/Page_02";
import Page_03 from "../bookPages/Page_03";
import Page_04 from "../bookPages/Page_04";

export const pageList = [
  {
    uid: pageKeys.PAGE_01,
    pageKey: pageKeys.PAGE_01,
    Mesh: Page_01,
    AxisMesh: ({ pageRotationRef, children, ...restProps }) => (
      <group ref={pageRotationRef}>
        <group position={[0, 0.2, 0.24]}>{children}</group>
      </group>
    ),
  },
  {
    uid: pageKeys.PAGE_02,
    pageKey: pageKeys.PAGE_02,
    Mesh: Page_02,
    AxisMesh: ({ pageRotationRef, children, ...restProps }) => (
      <group ref={pageRotationRef}>
        <group position={[0, 0.2, 0.08]}>{children}</group>
      </group>
    ),
  },
  {
    uid: pageKeys.PAGE_03,
    pageKey: pageKeys.PAGE_03,
    Mesh: Page_03,
    AxisMesh: ({ pageRotationRef, children, ...restProps }) => (
      <group ref={pageRotationRef}>
        <group position={[0, 0.2, -0.08]}>{children}</group>
      </group>
    ),
  },
  {
    uid: pageKeys.PAGE_04,
    pageKey: pageKeys.PAGE_04,
    Mesh: Page_04,
    AxisMesh: ({ pageRotationRef, children, ...restProps }) => (
      <group ref={pageRotationRef}>
        <group position={[0, 0.2, -0.24]}>{children}</group>
      </group>
    ),
  },
];
