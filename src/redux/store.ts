import { combineReducers, createStore, applyMiddleware } from 'redux';

const initialState = {};

const bindMiddleware = (middleware: Array<any>) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = combineReducers({});

export const store = createStore(reducer, bindMiddleware([]));
