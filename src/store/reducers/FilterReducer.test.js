import { filterReducer } from './FilterReducer';
import { successMessage } from './reducerHelper';
import { FETCH_FILTER } from 'Store/actions/index';

const initialState = {
    error: null,
    loading: false
};

describe('filter reducer', () => {
    const filterInitialState = {
        ...initialState,
        filter: {}
    };

    it('should return the initial state', () => {
        expect(filterReducer(undefined, {})).toEqual(filterInitialState);
    });

    it('should handle payload with null data', () => {
        const message = { type: successMessage(FETCH_FILTER), payload: { data: null }};
        const newState = filterReducer(filterInitialState, message);
        expect(newState).toEqual({ ...filterInitialState, loading: false, error: null, filter: {}});
    });
});
