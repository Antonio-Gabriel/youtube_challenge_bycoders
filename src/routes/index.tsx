import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Watch } from "../pages/Watch";
import { Search } from "../pages/Search";
import { History } from "../pages/History";

export function Routes() {
  const RoutesSwitch = () =>
    useRoutes([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/watch/:id",
        element: <Watch />,
      },
      {
        path: "/results",
        element: <Search />,
      },
      {
        path: "/histories",
        element: <History />,
      },
    ]);

  const queryString = "?search_query=:search";
  new URLSearchParams(queryString);

  return (
    <Router>
      <RoutesSwitch />
    </Router>
  );
}
