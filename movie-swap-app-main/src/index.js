import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { movieReducer } from "./movieReducer";
const rootReducer = combineReducers({
  movieReducer
});

const middlewareEnhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, middlewareEnhancer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
