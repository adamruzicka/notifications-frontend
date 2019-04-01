import React, { Fragment } from 'react';
import {
    CheckCircleIcon,
    TimesCircleIcon,
    QuestionCircleIcon
} from '@patternfly/react-icons';
import PropTypes from 'prop-types';

export const StatusIcon = ({ status }) => {
    if (status && typeof(status) !== 'string') {
        return <Fragment>
            <CheckCircleIcon color='green' /> Success
        </Fragment>;
    } else if (status === 'unknown') {
        return <Fragment>
            <QuestionCircleIcon color='grey' /> Unknown
        </Fragment>;
    } else {
        return <Fragment>
            <TimesCircleIcon color='red' /> Error
        </Fragment>;
    }
};

StatusIcon.propTypes = {
    status: PropTypes.oneOfType([ PropTypes.bool, PropTypes.oneOf([ 'unknown' ]) ]).isRequired
};

export default StatusIcon;
