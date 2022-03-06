import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes } from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";
import "./styles/_normalize.scss";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
