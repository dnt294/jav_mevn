import { createStore, applyMiddleware } from 'redux';

import { rootReducer } from '../reducers/root.reducer';

import axiosMiddleware from 'redux-axios-middleware';
import { client } from '../middlewares/axios.middleware';

export const store = createStore(
  rootReducer,
  applyMiddleware(
    axiosMiddleware(client)
  )
);
