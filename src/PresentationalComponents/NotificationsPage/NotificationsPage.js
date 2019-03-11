import React, { Fragment } from 'react';
import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';
import {
    Split,
    SplitItem
} from '@patternfly/react-core';
import PropTypes from 'prop-types';

export const NotificationsPage = ({ children, title, rightBar }) =>
    <Fragment>
        <PageHeader>
            <Split>
                <SplitItem isMain>
                    <PageHeaderTitle title={ title } />
                </SplitItem>
                <SplitItem>{ rightBar }</SplitItem>
            </Split>
        </PageHeader>
        <Main>
            { children }
        </Main>
    </Fragment>;

NotificationsPage.propTypes = {
    title: PropTypes.string.isRequired,
    rightBar: PropTypes.node,
    children: PropTypes.node
};

export default NotificationsPage;
