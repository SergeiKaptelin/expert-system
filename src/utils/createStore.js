import {createStore, compose, applyMiddleware, combineReducers} from "redux";
// import {reducer as reduxFormReducer} from "redux-form";
import thunk from "redux-thunk";

import * as reducers from "../reducers/index";

const win = window || {};

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(
    thunk,
  ),
  win.__REDUX_DEVTOOLS_EXTENSION__ ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
);

const reducer = combineReducers({
  ...reducers,
  // form: reduxFormReducer.plugin({
  //   encryptionForm: encryptionReducer,
  // }),
});

const configureStore = (initialState = {}) => {
  return createStore(reducer, initialState, enhancer);
};

export default configureStore;
