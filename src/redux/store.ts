import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { authenticateReducer } from "./reducers/authenticationReducer";
import { carriesVideosReducer } from "./reducers/CarriesVideosReducer";
import { carriesResultsReducer } from "./reducers/CarriesResultsReducer";
import { carriesRelatedVideosReducer } from "./reducers/CarriesRelatedVidoesReducer";

const rootReducer = combineReducers({
  auth: authenticateReducer,
  videos: carriesVideosReducer,
  relatedVideos: carriesRelatedVideosReducer,
  results: carriesResultsReducer
});

const store = createStore(
  rootReducer, {},
  composeWithDevTools(
      applyMiddleware(thunk)
    )
);

export default store;
