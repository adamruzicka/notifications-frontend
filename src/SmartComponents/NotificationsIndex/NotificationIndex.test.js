import { init } from 'Store';
import logger from 'redux-logger';

import { NotificationsIndex } from './NotificationsIndex';
import endpoints from '../../__fixtures__/endpoints';

import { normalizePayload } from 'Store/reducers/reducerHelper';
import toJson from 'enzyme-to-json';

describe('NotificationsIndex', () => {
    const testEndpoints = normalizePayload(endpoints).endpoint;
    const store = init(logger).getStore();
    const defaultProps = {
        fetchFilter: jest.fn(),
        fetchEndpoints: jest.fn(() => Promise.resolve({ endpoints: []})),
        deleteEndpoint: jest.fn(),
        toggleEndpoint: jest.fn(),
        newEndpoint: jest.fn(),
        testEndpoint: jest.fn(),
        endpoints: {},
        total: 0,
        store
    };

    it('expect to render an EmptyState by default (with no endpoints)', () => {
        const wrapper = shallow(
            <NotificationsIndex { ...defaultProps } />
        );
        expect(wrapper.find('EmptyState').length).toBe(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('takes endpoints', () => {
        const wrapper = shallow(
            <NotificationsIndex { ...defaultProps } total={ 1 } />
        );
        const rows = Object.values(testEndpoints).map(({ attributes: { active, name, url }}) => (
            [
                { title: name },
                { title: 'HTTP' },
                { title: url },
                { title: 'true' },
                { title: `${active}` },
                { title: 'actions' }
            ]));

        const wrapperWithState = wrapper.setState({ rows });
        expect(wrapperWithState.find('Table').length).toBe(1);
        expect(toJson(wrapperWithState)).toMatchSnapshot();
    });

    it('onSort', () => {
        const wrapperProps = {
            ...defaultProps,
            fetchEndpoints: jest.fn(() => Promise.resolve({ endpoints: testEndpoints })),
            endpoints: testEndpoints
        };
        const wrapper = shallow(
            <NotificationsIndex { ...wrapperProps } />
        );
        const instance = wrapper.instance();
        instance.filtersInRowsAndCells();
        instance.onSort(null, 0, 'desc');
        expect(wrapperProps.fetchEndpoints).toHaveBeenCalledWith(1, 10, 'name desc');
        instance.onSort(null, 2, 'desc');
        expect(wrapperProps.fetchEndpoints).toHaveBeenCalledWith(1, 10, 'url desc');
    });

    it('does not allow to paginate beyond total on perPage change', () => {
        const wrapperProps = {
            ...defaultProps,
            fetchEndpoints: jest.fn(() => Promise.resolve({ endpoints: testEndpoints })),
            endpoints: testEndpoints,
            total: 51
        };
        const wrapper = shallow(
            <NotificationsIndex { ...wrapperProps } />
        );
        const instance = wrapper.instance();
        const sort = 'name asc';
        expect(wrapperProps.fetchEndpoints).toHaveBeenCalledWith(1, 10, sort, false, null);
        instance.onPageChange(null, 4, false);
        expect(wrapperProps.fetchEndpoints).toHaveBeenCalledWith(4, 10, sort, false, null);
        instance.onPerPageSelect(null, 100);
        expect(wrapperProps.fetchEndpoints).toHaveBeenCalledWith(1, 100, sort, false, null);
    });
});
