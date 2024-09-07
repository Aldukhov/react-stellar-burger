import { applyMiddleware, createStore } from 'redux';
import { socketMiddleware } from '../webSocketServices/middleware/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { wsActions } from '../webSocketServices/actions';
import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);