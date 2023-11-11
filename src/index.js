import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./services/reducers/rootReducer";
import thunk from 'redux-thunk';

// Импортируем createRoot из "react-dom/client"
import { createRoot } from 'react-dom/client';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

// Используем createRoot из "react-dom/client"
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
