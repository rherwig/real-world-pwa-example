import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import 'typeface-roboto';
import 'material-design-icons/iconfont/material-icons.css';

import configureStore from '../shared/core/store';
import App from '../shared/App';

if ('serviceWorker' in navigator) {
    runtime.register();
}

const initialState = window.__INITIAL_STATE__ || {};
delete window.__INITIAL_STATE__;

const { store, history } = configureStore(initialState);

/**
 * Renders a react component into the #react-root div container.
 * Since react 16, the `hydrate` method is used instead of `render` when dealing
 * with server side rendering.
 *
 * @param Component React component that should be rendered
 */
const render = Component => {
    hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Component />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('react-root')
    );
};

render(App);

/**
 * This script provides hot module reloading in development mode.
 */
if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../shared/App', () => {
        const App = require('../shared/App').default;
        render(App);
    });
}
