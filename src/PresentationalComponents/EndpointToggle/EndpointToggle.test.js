import { init } from '../../store';
import logger from 'redux-logger';
import { EndpointToggle } from './EndpointToggle';

describe('EndpointToggle', () => {
    const store = init(logger).getStore();
    const onChange = jest.fn();
    const active = true;
    const id = 1;
    const defaultProps = {
        active,
        id,
        onChange,
        store
    };

    it('expect to render a Switch', () => {
        const wrapper = shallow(
            <EndpointToggle { ...defaultProps }/>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
