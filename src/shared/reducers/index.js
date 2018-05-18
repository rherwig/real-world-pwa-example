import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import products from './products';
import view from './view';

export default combineReducers({
    routerReducer,
    products,
    view
});
