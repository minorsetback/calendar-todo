import { applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//Core
import {rootReducer as reducer} from './rootReducer';
import {composeEnhancers, middleware} from './middleware';

//export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export const store = configureStore({
    reducer,
    middleware: [...middleware],
   });