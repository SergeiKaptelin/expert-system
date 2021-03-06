import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";

import Home from "./pages/Home/components/Home";

import configureStore from "./utils/createStore";

import "./styles/main.scss";

const initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
