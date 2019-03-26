import { filtersReducer } from './FiltersReducer';

const initialState = {
    error: null,
    loading: false
};

describe('filter reducer', () => {
    const filterInitialState = {
        ...initialState,
        filters: {}
    };
    it('should return the initial state', () => {
        expect(filtersReducer(undefined, {})).toEqual(filterInitialState);
    });
});
