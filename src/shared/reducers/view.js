import { SET_VIEW } from '../actions/view';

export default (state = 0, action) => {
    switch (action.type) {
        case SET_VIEW:
            return action.payload.view;
        default:
            return state;
    }
};
