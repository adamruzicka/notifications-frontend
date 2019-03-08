import { appsReducer, normalizeAppsData } from './AppsReducer';
import {
    FETCH_APPS
} from '../actions/index';
import {
    successMessage,
    failureMessage
} from './reducerHelper';

import apps from '../../__fixtures__/apps';

const initialState = {
    error: null,
    loading: false
};

const fromRequest = (type, payload) => ({
    type,
    payload
});

describe('AppsReducer', () => {
    const appsInitialState = {
        ...initialState,
        apps: []
    };

    it('should return the initial state', () => {
        expect(appsReducer(undefined, {})).toEqual(appsInitialState);
    });

    it('should handle FETCH_APPS_SUCCESS', () => {
        const expectation = {
            ...appsInitialState,
            loading: false,
            apps: normalizeAppsData(apps)
        };
        const newState = appsReducer(appsInitialState, fromRequest(successMessage(FETCH_APPS), apps));
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_APPS_FAILURE', () => {
        const error = 'Error!';
        const newState = appsReducer(
            appsInitialState,
            fromRequest(failureMessage(FETCH_APPS), { message: error })
        );
        expect(newState).toEqual({
            ...appsInitialState,
            loading: false,
            error
        });
    });
});
