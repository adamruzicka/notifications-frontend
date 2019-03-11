import React from 'react';
import PropTypes from 'prop-types';

export const CustomFieldTemplate = ({ id, classNames, label, help, required, description, errors, children }) => {
    let allClassNames = classNames.concat([ ' pf-c-form__group' ]);

    return (
        <div className={ allClassNames }>
            <label htmlFor={ id }>{ label } { required ? '*' : null }</label>
            { description }
            { children }
            { errors }
            { help }
        </div>
    );
};

CustomFieldTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.object,
    required: PropTypes.bool,
    description: PropTypes.object,
    errors: PropTypes.object,
    children: PropTypes.array
};
