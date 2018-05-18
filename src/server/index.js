import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import configureStore from '../shared/core/store';
import Document from './document';
import App from '../shared/App';

/**
 * Mock data for providing redux initial state.
 */
import products from '../mock/products';

const mockState = {
    products
};

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    try {
        const { store, history } = configureStore(mockState, true);

        store.dispatch(push(req.originalUrl));

        const sheet = new ServerStyleSheet();
        const app = (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <StyleSheetManager sheet={sheet.instance}>
                        <App />
                    </StyleSheetManager>
                </ConnectedRouter>
            </Provider>
        );

        const appString = ReactDOM.renderToString(app);
        const { title } = Helmet.renderStatic();
        const chunkNames = flushChunkNames();
        const { js } = flushChunks(clientStats, { chunkNames });
        const styleTags = sheet.getStyleTags();
        const initialState = store.getState();

        res.send(
            Document({
                title: title.toString(),
                appString,
                js,
                styleTags,
                initialState
            })
        );
    } catch (e) {
        res.send(e.message);
    }
};
