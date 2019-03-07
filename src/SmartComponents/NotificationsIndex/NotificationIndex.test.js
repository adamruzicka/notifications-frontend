import { init } from '../../store';
import logger from 'redux-logger';

import { NotificationsIndex } from './NotificationsIndex';

const testEndpoints = [
    {
        id: 1,
        name: 'TEST Endpoint #1',
        url: 'http://endpoint.com',
        active: true,
        filtersCount: 2
    },
    {
        id: 2,
        name: 'TEST Endpoint #2',
        url: 'http://endpoint2.com',
        active: true,
        filtersCount: 1
    },
    {
        id: 3,
        name: 'TEST Endpoint #3',
        url: 'http://endpoint3.com',
        active: false,
        filtersCount: 4
    }
];

describe('NotificationsIndex', () => {
    const store = init(logger).getStore();
    const defaultProps = {
        fetchFilters: jest.fn(),
        fetchEndpoints: jest.fn(),
        deleteEndpoint: jest.fn(),
        toggleEndpoint: jest.fn(),
        newEndpoint: jest.fn(),
        filters: [],
        endpoints: [],
        store
    };

    it('expect to render an EmptyState by default (with no endpoints)', () => {
        const wrapper = shallow(
            <NotificationsIndex { ...defaultProps } />
        );
        expect(wrapper.find('EmptyState').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('takes endpoints', () => {
        const wrapper = shallow(
            <NotificationsIndex { ...defaultProps } endpoints={ testEndpoints }/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
