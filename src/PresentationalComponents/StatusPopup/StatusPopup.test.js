import { StatusPopup } from './StatusPopup';

describe('StatusPopup', () => {
    it('expect to render when status is unknown', () => {
        const wrapper = shallow(
            <StatusPopup status={ 'unknown' } />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});

describe('StatusPopup', () => {
    it('expect to render TimesCirclePopup', () => {
        const wrapper = shallow(
            <StatusPopup status={ 'failure' } />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});

describe('StatusPopup', () => {
    it('expect to render QuestionCirclePopup', () => {
        const wrapper = shallow(
            <StatusPopup status={ 'success' } />
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});
