import { endpointReducer, filterReducer } from './index';
import {
    DELETE_ENDPOINT,
    FETCH_ENDPOINTS
} from '../actions/index';
import {
    successMessage,
    failureMessage
} from './reducerHelper';

import endpoints from '../../__fixtures__/endpoints';

const initialState = {
    error: null,
    loading: false
};

const fromRequest = (type, payload) => ({
    type,
    payload
});

describe('filter reducer', () => {
    const filterInitialState = {
        ...initialState,
        filters: []
    };
    it('should return the initial state', () => {
        expect(filterReducer(undefined, {})).toEqual(filterInitialState);
    });
});

describe('endpoint reducer', () => {
    const endpointInitialState = {
        ...initialState,
        endpoints: []
    };

    const exampleEndpoint = {
        id: endpoints[0].id,
        attributes: {
            ...endpoints[0]
        }
    };

    it('should return the initial state', () => {
        expect(endpointReducer(undefined, {})).toEqual(endpointInitialState);

    });

    it('should handle FETCH_ENDPOINTS_SUCCESS', () => {
        const expectation = {
            ...endpointInitialState,
            loading: false,
            endpoints: [{
                id: 1,
                type: exampleEndpoint.type,
                ...exampleEndpoint.attributes,
                filtersCount: exampleEndpoint.attributes.filter_count
            }]
        };
        const newState = endpointReducer(endpointInitialState, fromRequest(successMessage(FETCH_ENDPOINTS), { data: [ exampleEndpoint ]}));
        expect(newState).toEqual(expectation);
    });

    it('should handle FETCH_ENDPOINTS_FAILURE', () => {
        const error = 'It broke';
        const newState = endpointReducer(
            endpointInitialState,
            fromRequest(failureMessage(FETCH_ENDPOINTS), { message: error })
        );
        expect(newState).toEqual({
            ...endpointInitialState,
            loading: false,
            error
        });
    });

    it('should handle DELETE_ENDPOINT_SUCCESS', () => {
        const elements = (ids) => ids.map(id => ({ id }));
        const action = fromRequest(successMessage(DELETE_ENDPOINT), { id: 2 });
        const newState = endpointReducer({ ...endpointInitialState, endpoints: elements([ 1, 2, 3 ]) }, action);
        expect(newState).toEqual({
            ...endpointInitialState,
            endpoints: elements([ 1, 3 ])
        });
    });
});
