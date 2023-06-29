import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "app/App";
import {configureStore} from "app/store";
import {Provider} from "react-redux";

// prepare store
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store;
}
