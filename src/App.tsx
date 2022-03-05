import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes } from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
