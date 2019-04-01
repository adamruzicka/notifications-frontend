import React from 'react';
import {
    CheckCircleIcon,
    TimesCircleIcon
} from '@patternfly/react-icons';
import PropTypes from 'prop-types';

export const StatusIcon = ({ status }) =>
    status ? <CheckCircleIcon color='green' /> : <TimesCircleIcon color='red' />;

StatusIcon.propTypes = {
    status: PropTypes.bool.isRequired
};

export default StatusIcon;
