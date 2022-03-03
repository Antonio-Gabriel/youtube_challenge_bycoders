import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { authenticateReducer } from "./reducers/authenticationReducer";

const rootReducer = combineReducers({
    auth: authenticateReducer
});

const store = createStore(rootReducer, {},
    composeWithDevTools(
        applyMiddleware(thunk)
    ));

export default store;