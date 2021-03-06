import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "./reducers";
import { tokenMiddleWare } from "./tokenMiddleware";
import loggerMiddleware from "./logger-middleware";
import { wsMiddleware } from "./webSocketsMiddleware";

//delete in packed json please
import logger from "redux-logger";

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(wsMiddleware,Thunk, tokenMiddleWare, loggerMiddleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("./reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
