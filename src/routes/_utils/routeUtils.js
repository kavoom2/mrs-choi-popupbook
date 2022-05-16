export function flattenRoutes(routes) {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((route) => {
    flatRoutes.push(route);

    if (typeof children !== "undefined") {
      flatRoutes = [...flatRoutes, flattenRoutes(route.children)];
    }
  });

  return flatRoutes;
}
