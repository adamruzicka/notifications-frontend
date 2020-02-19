import React, { Fragment } from 'react';
import { Tooltip } from '@patternfly/react-core';
import PropTypes from 'prop-types';

export const StatusPopup = ({ children, status, lastAttempt, lastFailure }) => {
    let content = 'No delivery attempts so far';
    if (status === 'success') {
        content = `Last delivery attempt: ${ lastAttempt }`;
    } else if (status === 'failure') {
        content = (
            <div>
              Last delivery attempt: { lastAttempt }
                <br />
              Failed at: { lastFailure }
            </div>
        );
    }

    return (
        <Fragment>
            <Tooltip
                content={ content } >
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
