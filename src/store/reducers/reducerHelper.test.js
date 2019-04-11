import normalize from 'json-api-normalizer';
import {
    successMessage,
    failureMessage,
    pendingMessage,
    initialStateFor,
    includeRelationships,
    normalizeData
} from './reducerHelper';

import apps from '../../__fixtures__/apps';
import endpoints from '../../__fixtures__/endpoints';

describe('initialStateFor', () => {
    it('returns and object with the reducers initial object', () => {
        expect(initialStateFor('data')).toEqual({
            data: [],
            error: null,
            loading: false
        });
    });

    it('can take a initial object argument', () => {
        expect(initialStateFor('data', {})).toEqual({
            data: {},
            error: null,
            loading: false
        });
    });
});

describe('successMessage', () => {
    it('appends _FULFILLED', () => {
        expect(successMessage('FETCH')).toEqual('FETCH_FULFILLED');
    });
});

describe('failureMessage', () => {
    it('appends _REJECTED', () => {
        expect(failureMessage('FETCH')).toEqual('FETCH_REJECTED');
    });
});

describe('pendingMessage', () => {
    it('appends _PENDING', () => {
        expect(pendingMessage('FETCH')).toEqual('FETCH_PENDING');
    });
});

describe('includeRelationships', () => {
    it('includes related objected into its parent', () => {
        expect(includeRelationships(normalize(apps))).toMatchSnapshot();
    });
});

describe('normalizeData', () => {
    it('normalizes API data', () => {
        expect(normalizeData(endpoints, 'endpoint', '/endpoint')).toMatchSnapshot();
    });

    it('sorts it when sortBy is given', () => {
        expect(normalizeData(endpoints, 'endpoint', '/endpoint', 'url desc')).toMatchSnapshot();
    });

    it('sorts it asc when sortBy is given', () => {
        expect(normalizeData(endpoints, 'endpoint', '/endpoint', 'url asc')).toMatchSnapshot();
    });

    it('skips sorting when column is not known', () => {
        expect(normalizeData(endpoints, 'endpoint', '/endpoint', 'unknownColumn asc')).toMatchSnapshot();
    });
});
