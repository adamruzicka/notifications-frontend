import _ from 'lodash';
import { endpointsReducer } from './EndpointsReducer';
import {
    DELETE_ENDPOINT,
    FETCH_ENDPOINTS,
    FETCH_ENDPOINT,
    NEW_ENDPOINT,
    SUBMIT_ENDPOINT
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    pendingMessage
} from './reducerHelper';

import endpoints, { endpoint } from '../../__fixtures__/endpoints';
import { normalizePayload } from 'Store/reducers/reducerHelper';

const initialState = {
    error: null,
    loading: false
};

const fromRequest = (type, payload, meta: {}) => ({
    type,
    payload,
    meta
});

describe('endpoint reducer', () => {
    const endpointInitialState = {
        ...initialState,
        endpoints: {}
    };

    it('should return the initial state', () => {
        expect(endpointsReducer(undefined, {})).toEqual(endpointInitialState);
    });

    it('should handle NEW_ENDPOINT', () => {
        const expectation = {
            ...endpointInitialState,
            endpoint: null
        };
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(NEW_ENDPOINT, { })
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_ENDPOINTS_PENDING', () => {
        const expectation = {
            ...endpointInitialState,
            loading: true,
            error: null
        };
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(pendingMessage(FETCH_ENDPOINTS), { })
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_ENDPOINT_PENDING', () => {
        const expectation = {
            ...endpointInitialState,
            loading: true,
            error: null
        };
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(pendingMessage(FETCH_ENDPOINT), { })
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_ENDPOINTS_SUCCESS', () => {
        const expectation = {
            ...endpointInitialState,
            loading: false,
            endpoints: _.mapValues(normalizePayload(endpoints).endpoint, (item) => ({ ...item, ...item.attributes })),
            total: 3
        };
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(successMessage(FETCH_ENDPOINTS), endpoints, { endpoint: '' })
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_ENDPOINT_SUCCESS', () => {
        let testEndpoint = Object.values(normalizePayload(endpoint).endpoint)[0];
        testEndpoint = _.assign(testEndpoint, testEndpoint.attributes);

        const expectation = {
            ...endpointInitialState,
            loading: false,
            endpoint: {
                [testEndpoint.id]: testEndpoint
            }
        };
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(successMessage(FETCH_ENDPOINT), endpoint)
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_ENDPOINTS_FAILURE', () => {
        const error = 'It broke';
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(failureMessage(FETCH_ENDPOINTS), { message: error })
        );
        expect(newState).toEqual({
            ...endpointInitialState,
            loading: false,
            error
        });
    });

    it('should handle FETCH_ENDPOINT_FAILURE', () => {
        const error = 'It broke';
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(failureMessage(FETCH_ENDPOINT), { message: error })
        );
        expect(newState).toEqual({
            ...endpointInitialState,
            loading: false,
            error
        });
    });

    it('should handle SUBMIT_ENDPOINT_PENDING', () => {
        const expectation = {
            ...endpointInitialState,
            submitting: true
        };
        const newState = endpointsReducer(
            endpointInitialState,
            fromRequest(pendingMessage(SUBMIT_ENDPOINT), { })
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle SUBMIT_ENDPOINT_FULFILLED', () => {
        const expectation = {
            ...endpointInitialState,
            endpoints: normalizePayload(endpoints).endpoint,
            endpoint: Object.values(normalizePayload(endpoint).endpoint)[0],
            submitting: false,
            message: 'Endpoint saved'
        };
        const newState = endpointsReducer(
            {
                ...endpointInitialState,
                endpoints: normalizePayload(endpoints).endpoint
            },
            fromRequest(successMessage(SUBMIT_ENDPOINT), endpoint)
        );
        expect(newState).toEqual(expectation);
    });

    it('should handle SUBMIT_ENDPOINT_FAILURE', () => {
        const error = 'Submit failed!';
        const action = fromRequest(failureMessage(SUBMIT_ENDPOINT), { message: error }, { data: {}});
        const newState = endpointsReducer(endpointInitialState, action);
        expect(newState).toEqual({
            ...endpointInitialState,
            loading: false,
            submitting: false,
            endpoint: {},
            error
        });
    });

    it('should handle DELETE_ENDPOINT_SUCCESS', () => {
        const elements = (ids) => Object.assign(...ids.map(id => ({ [id]: { id }})));
        const action = fromRequest(successMessage(DELETE_ENDPOINT), { id: 2 });
        const newState = endpointsReducer({ ...endpointInitialState, endpoints: elements([ 1, 2, 3 ]), total: 3 }, action);
        expect(newState).toEqual({
            ...endpointInitialState,
            endpoints: elements([ 1, 3 ]),
            total: 2
        });
    });

    it('should handle DELETE_ENDPOINT_FAILURE', () => {
        const error = 'Delete failed!';
        const action = fromRequest(failureMessage(DELETE_ENDPOINT), { message: error });
        const newState = endpointsReducer(endpointInitialState, action);
        expect(newState).toEqual({
            ...endpointInitialState,
            loading: false,
            error
        });
    });
});
