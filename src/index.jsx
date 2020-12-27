import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./commonComponents/App";
import store from "./app/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
