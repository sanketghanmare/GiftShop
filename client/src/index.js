import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import store from "./store"
import Page from "./component/Page"

ReactDOM.render(
    <Provider store = {store}>
      <Page />
    </Provider>, document.querySelector('#root')
);
