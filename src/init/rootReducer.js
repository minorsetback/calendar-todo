import { combineReducers } from 'redux';

import { todoReducer as todo } from '../bus/todo/reducer';

export const rootReducer = combineReducers({
  todo
});
