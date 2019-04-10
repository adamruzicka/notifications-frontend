import { init } from 'Store';
import logger from 'redux-logger';

import { NotificationsIndex } from './NotificationsIndex';
import endpoints from '../../__fixtures__/endpoints';

import { normalizePayload } from 'Store/reducers/reducerHelper';
import toJson from 'enzyme-to-json';

describe('NotificationsIndex', () => {
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
        const testEndpoints = normalizePayload(endpoints).endpoint;
        const wrapper = shallow(
            <NotificationsIndex { ...defaultProps } />
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
});
