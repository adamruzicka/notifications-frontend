import toJson from 'enzyme-to-json';

import { CustomInputFieldTemplate } from './CustomInputFieldTemplate';

describe('CustomInputFieldTemplate', () => {
    const testProps = {
        formData: 'Test Form Data',
        schema: {
            title: 'Test Input Field'
        },
        uiSchema: {
            'ui:placeholder': 'Placeholder text'
        },
        errorSchema: {},
        onChange: jest.fn(),
        name: 'test-input-field',
        required: true
    };

    it('expect to render', () => {
        const wrapper = shallow(
            <CustomInputFieldTemplate { ...testProps } />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('expect to call onChange handler', () => {
        const wrapper = shallow(
            <CustomInputFieldTemplate { ...testProps } />
        );
        const testString = 'Test Input';
        wrapper.find('TextInput').simulate('change', testString);
        expect(testProps.onChange).toHaveBeenCalledWith(testString);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
