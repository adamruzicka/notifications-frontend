import toJson from 'enzyme-to-json';

import { CustomBooleanFieldTemplate } from './CustomBooleanFieldTemplate';

describe('CustomBooleanFieldTemplate', () => {
    it('expect to render', () => {
        const testProps = {
            formData: true,
            schema: {
                title: 'Test Input Field'
            },
            onChange: jest.fn(),
            name: 'test-input-field',
            required: true
        };

        const wrapper = shallow(
            <CustomBooleanFieldTemplate { ...testProps } />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
