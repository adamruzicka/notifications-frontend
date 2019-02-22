import { init } from '../../store';
import logger from 'redux-logger';
import { NotificationEdit } from './NotificationEdit';

const testEndpoint = {
    id: 3,
    name: 'TEST Endpoint #3',
    url: 'http://endpoint3.com',
    active: false,
    filtersCount: 4
};

describe('NotificationEdit', () => {
    const store = init(logger).getStore();
    const fetchEndpoint = jest.fn();
    const createEndpoint = jest.fn();
    const updateEndpoint = jest.fn();
    const defaultProps = {
        match: {
            params: {
                endpointId: '1'
            }
        },
        fetchEndpoint,
        createEndpoint,
        updateEndpoint,
        store
    };

    it('expect to render a Form', () => {
        const wrapper = shallow(
            <NotificationEdit { ...defaultProps }/>
        );
        expect(wrapper.find('Form').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('takes an endpoint', () => {
        const wrapper = shallow(
            <NotificationEdit { ...defaultProps } endpoint={ testEndpoint }/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
