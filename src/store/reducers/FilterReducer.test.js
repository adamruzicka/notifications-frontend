import { filterReducer } from './FilterReducer';

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
});
