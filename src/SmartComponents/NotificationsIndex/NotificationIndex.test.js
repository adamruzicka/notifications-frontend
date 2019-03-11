import { init } from 'Store';
import logger from 'redux-logger';

import { NotificationsIndex } from './NotificationsIndex';
import endpoints from '../../__fixtures__/endpoints';

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
            <NotificationsIndex { ...defaultProps } endpoints={ endpoints }/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
