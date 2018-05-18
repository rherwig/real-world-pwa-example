import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';

export default (initialState, isSsr = false) => {
    const middleware = [];
    const history = isSsr ? createMemoryHistory() : createBrowserHistory();

    middleware.push(routerMiddleware(history));

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }

    return { history, store };
};
