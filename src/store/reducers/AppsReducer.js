import {
    FETCH_APPS
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    initialStateFor,
    normalizeData
} from './reducerHelper';

export const normalizeAppsData = (payload) =>
    normalizeData(payload, 'app');

export const appsReducer = function(state = initialStateFor('apps', {}), action) {
    switch (action.type) {
        case FETCH_APPS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_APPS):
            return {
                ...state,
                loading: false,
                error: null,
                apps: normalizeAppsData(action.payload)
            };

        case failureMessage(FETCH_APPS):
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                apps: {}
            };

        default:
            return state;
    }
};
