import React, { Fragment } from 'react';
import {
    CheckCircleIcon,
    TimesCircleIcon,
    QuestionCircleIcon
} from '@patternfly/react-icons';
import PropTypes from 'prop-types';

export const StatusIcon = ({ status }) => {
    if (status === 'success') {
        return <Fragment>
            <CheckCircleIcon color='green' /> Success
        </Fragment>;
    } else if (status === 'failure') {
        return <Fragment>
            <TimesCircleIcon color='red' /> Error
        </Fragment>;
    } else {
        return <Fragment>
            <QuestionCircleIcon color='grey' /> Unknown
        </Fragment>;
    }
};

StatusIcon.propTypes = {
    status: PropTypes.oneOf([ 'success', 'failure', 'unknown' ]).isRequired
};

export default StatusIcon;
