import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

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
    ]);

  return (
    <Router>
      <RoutesSwitch />
    </Router>
  );
}
