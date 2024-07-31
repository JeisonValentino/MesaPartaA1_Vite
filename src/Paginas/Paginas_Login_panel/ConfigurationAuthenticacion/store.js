import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import auchLoader from './reducer/auchLoader';
import { configureStore } from '@reduxjs/toolkit';
import { toastReducer } from './reducer/toastReducer';

const store = configureStore({
    reducer: {
        auth: auchLoader,
        toast: toastReducer
    }
});
export default store;