import React, { Fragment } from 'react';
import { Tooltip } from '@patternfly/react-core';
import PropTypes from 'prop-types';

export const StatusPopup = ({ children, status, lastAttempt, lastFailure }) => {
    let lines = [];
    if (status === 'success') {
        lines.push(`Last delivery attempt: ${ lastAttempt }`);
    } else if (status === 'failure') {
        lines.push(`Last delivery attempt: ${ lastAttempt }`);
        // Warning: Each child in an array or iterator should have a unique "key" prop.
        // What?
        lines.push(<br key={ '' } />);
        lines.push(`Failed at: ${ lastFailure }`);
    } else {
        lines.push('No delivery attemps so far');
    }

    return (
        <Fragment>
            <Tooltip
                content={ lines } >
                <span>
                    { children }
                </span>
            </Tooltip>
        </Fragment>
    );
};

StatusPopup.propTypes = {
    status: PropTypes.oneOf([ 'success', 'failure', 'unknown' ]).isRequired,
    lastAttempt: PropTypes.string,
    lastFailure: PropTypes.string,
    children: PropTypes.node
};

export default StatusPopup;
