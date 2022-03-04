import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { authenticateReducer } from "./reducers/authenticationReducer";
import { carriesVideosReducer } from "./reducers/CarriesVideosReducer";

const rootReducer = combineReducers({
  auth: authenticateReducer,
  videos: carriesVideosReducer,
});

const store = createStore(
  rootReducer, {},
  composeWithDevTools(
      applyMiddleware(thunk)
    )
);

export default store;
