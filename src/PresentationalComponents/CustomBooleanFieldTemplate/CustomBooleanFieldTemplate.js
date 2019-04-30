import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup } from '@patternfly/react-core';

export class CustomBooleanFieldTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.formData };
    }

    handleCheckboxToggle = value => {
        this.props.onChange(value);
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return <FormGroup fieldId={ `custom-checkbox-${ this.props.name }` } isRequired={ this.props.required }
            style={ { marginTop: '1em' } }>
            <Checkbox
                label={ this.props.schema.title }
                aria-label={ this.props.schema.title }
                defaultChecked={ value }
                onChange={ this.handleCheckboxToggle }
                id={ `custom-checkbox-${ this.props.name }` }
                key={ `custom-checkbox-${ this.props.name }-key` }
            />
        </FormGroup>;
    }
}

CustomBooleanFieldTemplate.propTypes = {
    formData: PropTypes.bool,
    required: PropTypes.bool,
    schema: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default CustomBooleanFieldTemplate;
