import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, FormGroup } from '@patternfly/react-core';

export class CustomInputFieldTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.formData ? props.formData : '' };
    }

    handleTextInputChange = value => {
        this.props.onChange(value);
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        const placeholder = this.props.uiSchema['ui:placeholder'];
        const hasErrors = this.props.errorSchema.errors;
        const invalidHelperText = hasErrors ? this.props.errorSchema.errors.join(', ') : '';

        return <FormGroup
            label={ this.props.schema.title }
            isRequired={ this.props.required }
            isValid={ !hasErrors }
            helperTextInvalid={ invalidHelperText }
            fieldId={ `custom-input-${ this.props.name }` }>
            <TextInput value={ value } aria-label={ this.props.schema.title } isValid={ !hasErrors }
                type="text" onChange={ this.handleTextInputChange } placeholder={ placeholder } />
        </FormGroup>;
    }
}

CustomInputFieldTemplate.propTypes = {
    formData: PropTypes.string,
    onChange: PropTypes.func,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    name: PropTypes.string,
    required: PropTypes.bool
};

export default CustomInputFieldTemplate;
