import toJson from 'enzyme-to-json';

import { CustomBooleanFieldTemplate } from './CustomBooleanFieldTemplate';

describe('CustomBooleanFieldTemplate', () => {
    const testProps = {
        formData: true,
        schema: {
            title: 'Test Input Field'
        },
        onChange: jest.fn(),
        name: 'test-input-field',
        required: true
    };

    it('expect to render', () => {
        const wrapper = shallow(
            <CustomBooleanFieldTemplate { ...testProps } />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('expect to call onChange handler', () => {
        const wrapper = shallow(
            <CustomBooleanFieldTemplate { ...testProps } />
        );
        wrapper.find('Checkbox').simulate('change', true);
        expect(testProps.onChange).toHaveBeenCalledWith(true);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
