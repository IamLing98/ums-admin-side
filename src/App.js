/**
 * Main App
 */
import React from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
// css
import "./lib/reactifyCss";
import "antd/dist/antd.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/print/lib/styles/index.css"; 
// app component
import App from "./container/App";

import { configureStore } from "./store";
import { Redirect } from "react-router";
import { AsyncSessionPage404Component } from "Components/AsyncComponent/AsyncComponent";
import { Worker } from "@react-pdf-viewer/core";
const MainApp = (props) => (
  <Provider store={configureStore()}>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js"> 
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </Worker>
  </Provider>
);

export default MainApp;
