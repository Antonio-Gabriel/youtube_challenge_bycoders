import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Details } from "../pages/Details";

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
        path: "/video-details/:id",
        element: <Details />,
      },
    ]);

  return (
    <Router>
      <RoutesSwitch />
    </Router>
  );
}
