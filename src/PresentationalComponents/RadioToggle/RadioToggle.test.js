import { RadioToggle, ALL, SELECTED } from './RadioToggle';

describe('RadioToggle', () => {
    const scope = 'my-app-1';
    const selectable = true;
    const defaultProps = { scope, selectable };

    it('expect to render just the radios on all', () => {
        const wrapper = shallow(
            <RadioToggle { ...defaultProps } initial={ ALL }>
                Something
            </RadioToggle>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('expect to render children on selected', () => {
        const wrapper = shallow(
            <RadioToggle { ...defaultProps } initial={ SELECTED }>
                Something
            </RadioToggle>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('expect to render only one radio if not selectable', () => {
        const wrapper = shallow(
            <RadioToggle { ...defaultProps } initial={ SELECTED } selectable={ false }>
                Something
            </RadioToggle>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
