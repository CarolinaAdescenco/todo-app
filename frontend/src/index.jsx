import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

// faz a promise ser resolvida para disparar o reducer
import promise from 'redux-promise';

// serve para retornar um array com varias actions
import multi from 'redux-multi';

//permite retornar uma action e assim fazer as promises sequencialmente .then
import thunk from 'redux-thunk'; 

import App from './main/app';
import reducers from './main/reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

, document.getElementById('app'))