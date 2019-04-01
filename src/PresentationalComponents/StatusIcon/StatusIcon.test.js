import { StatusIcon } from './StatusIcon';

describe('StatusIcon', () => {
    it('expect to render CheckCircleIcon', () => {
        const wrapper = shallow(
            <StatusIcon status={ true } />
        );
        expect(wrapper.find('CheckCircleIcon').length).toBe(1);
        expect(wrapper.find('TimesCircleIcon').length).toBe(0);
        expect(wrapper.render()).toMatchSnapshot();
    });
});

describe('StatusIcon', () => {
    it('expect to render TimesCircleIcon', () => {
        const wrapper = shallow(
            <StatusIcon status={ false } />
        );
        expect(wrapper.find('CheckCircleIcon').length).toBe(0);
        expect(wrapper.find('TimesCircleIcon').length).toBe(1);
        expect(wrapper.render()).toMatchSnapshot();
    });
});
