import { applyMiddleware, compose, createStore } from 'redux/es/redux.mjs';
import ReduxThunk from 'redux-thunk';
import { appReducer } from './reducer.js';

function logger({ getState }) {
    return next => action => {
      console.log('will dispatch', action)
  
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)
  
      console.log('state after dispatch', getState())
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  }
  

export const store = createStore(
    appReducer,
    compose(
        applyMiddleware(ReduxThunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    ),
);
