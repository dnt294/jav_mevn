import { combineReducers } from 'redux';

import { verbsReducer } from './verbs.reducer';

export const rootReducer = combineReducers({
  verbs: verbsReducer
})
