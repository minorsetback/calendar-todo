import { configureStore } from '@reduxjs/toolkit';
//Core
import { rootReducer as reducer } from './rootReducer';
import { middleware } from './middleware';

export const store = configureStore({
    reducer,
    middleware: [...middleware],
});