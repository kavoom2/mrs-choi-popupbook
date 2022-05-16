import { Navigate, Route } from "react-router-dom";
import homeRoutes from "./home";
import { mainPathname, rootPathname } from "./_utils/constant";
import { flattenRoutes } from "./_utils/routeUtils";

const rootRoute = {
  name: `ROUTE_ROOT`,
  path: rootPathname,
  exact: true,
  pageComponent: () => <Navigate to={mainPathname} />,
  routeComponent: Route,
};

const elseRoute = {
  name: `ROUTE_ELSE`,
  path: "*",
  pageComponent: () => <Navigate to={mainPathname} />,
  routeComponent: Route,
};

export const allRoutes = [homeRoutes, rootRoute, elseRoute];

export const allFlattenRoutes = flattenRoutes(allRoutes);
