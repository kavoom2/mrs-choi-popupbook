import { Route } from "react-router-dom";
import HomePage from "../../pages/home";
import { mainPathname } from "../_utils/constant";

const homeRoutes = {
  name: `ROUTE_HOME`,
  path: mainPathname,
  exact: true,
  routeComponent: Route,
  pageComponent: HomePage,
};

export default homeRoutes;
