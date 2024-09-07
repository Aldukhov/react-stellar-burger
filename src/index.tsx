import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./services/reducers/rootReducer";
import { wsActions } from "./webSocketServices/actions";
import { socketMiddleware } from "./webSocketServices/middleware/socketMiddleware";
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router } from "react-router-dom";
import { RootState } from "./services/rootState/rootState";
import { AppDispatch } from "./services/rootState/rootState";
import { createRoot } from 'react-dom/client'

const middleware: Middleware<{}, RootState, AppDispatch>[] = [
  thunkMiddleware,
  socketMiddleware(wsActions),
];

const storeWithMiddleware = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);

const rootElement = document.getElementById('root');

if(rootElement)
{const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={storeWithMiddleware}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);} else {
  console.error("Root element not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


