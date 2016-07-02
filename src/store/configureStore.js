import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import promiseMiddleware from 'redux-promise';

export default function configureStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(promiseMiddleware));
}
