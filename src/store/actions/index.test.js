jest.mock('../../Utilities/notificationsBackendAPI', () => ({
    get: jest.fn(() => Promise.resolve({})),
    create: jest.fn(() => Promise.resolve({})),
    update: jest.fn(() => Promise.resolve({})),
    destroy: jest.fn(() => Promise.resolve({}))
}));

import * as actionGenerator from '.';

describe('fetchEndpoints', () => {
    it('returns a state object', () => {
        expect(actionGenerator.fetchEndpoints(1, 10)).toMatchSnapshot();
    });
});

describe('fetchEndpoint', () => {
    it('returns a state object', () => {
        expect(actionGenerator.fetchEndpoint(1)).toMatchSnapshot();
    });
});

describe('createEndpoint', () => {
    it('returns a state object', () => {
        expect(actionGenerator.createEndpoint({ name: 'Endpoint name' })).toMatchSnapshot();
    });
});

describe('updateEndpoint()', () => {
    it('returns a state object', () => {
        expect(actionGenerator.updateEndpoint(1, { name: 'Endpoint name' })).toMatchSnapshot();
    });
});

describe('toggleEndpoint', () => {
    it('returns a state object', () => {
        expect(actionGenerator.toggleEndpoint(1, true)).toMatchSnapshot();
    });
});

describe('deleteEndpoint', () => {
    it('returns a state object', () => {
        expect(actionGenerator.deleteEndpoint(1, 'Endpoint name')).toMatchSnapshot();
    });
});

describe('newEndpoint', () => {
    it('returns a state object', () => {
        expect(actionGenerator.newEndpoint()).toMatchSnapshot();
    });
});

describe('fetchFilters', () => {
    it('returns a state object', () => {
        expect(actionGenerator.fetchFilters(1)).toMatchSnapshot();
    });
});

describe('fetchApps', () => {
    it('returns a state object', () => {
        expect(actionGenerator.fetchApps()).toMatchSnapshot();
    });
});
