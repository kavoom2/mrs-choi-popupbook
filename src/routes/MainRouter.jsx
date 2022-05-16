import { BrowserRouter, Routes } from "react-router-dom";
import { ErrorBoundary } from "../components/Error";
import { allFlattenRoutes } from "./routes";

// Nested Routes는 각 페이지 내부에서 관리합니다.

function MainRouter() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {allFlattenRoutes.map(
            ({
              routeComponent: RouteComponent,
              pageComponent: PageComponent,
              name,
              path,
              exact,
              children,
            }) => {
              return (
                !children && (
                  <RouteComponent
                    key={name}
                    path={path}
                    exact={exact}
                    element={<PageComponent />}
                  />
                )
              );
            }
          )}
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default MainRouter;
