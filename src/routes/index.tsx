import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Watch } from "../pages/Watch";

export function Routes() {
  const RoutesSwitch = () =>
    useRoutes([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/watch/:id",
        element: <Watch />,
      },
    ]);

  return (
    <Router>
      <RoutesSwitch />
    </Router>
  );
}
