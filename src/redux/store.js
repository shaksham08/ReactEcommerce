import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//this persistor has the persisted version of our store
export const persistor = persistStore(store);

const moduleToExports = {
  store,
  persistor,
};

export default moduleToExports;
