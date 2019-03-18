import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';
import {
    Breadcrumb,
    BreadcrumbItem,
    Split,
    SplitItem
} from '@patternfly/react-core';

import PropTypes from 'prop-types';

export class NotificationsPage extends Component {
    toIndex = (event) => {
        event.preventDefault();
        this.props.history.push('/list');
    }

    showRootLink = () =>
        this.props.history && this.props.history.location.pathname !== '/list' ?
            <BreadcrumbItem to='#' onClick={ this.toIndex }>Notifications</BreadcrumbItem>
            : '';

    render() {
        const { rightBar, title, children } = this.props;

        return (
            <Fragment>
                <PageHeader>
                    <Split>
                        <SplitItem isMain>
                            <Breadcrumb>
                                { this.showRootLink() }
                                <BreadcrumbItem isActive>
                                    { title }
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <PageHeaderTitle title={ title } />
                        </SplitItem>
                        <SplitItem>{ rightBar }</SplitItem>
                    </Split>
                </PageHeader>
                <Main>
                    { children }
                </Main>
            </Fragment>
        );
    }
};

NotificationsPage.propTypes = {
    title: PropTypes.string.isRequired,
    rightBar: PropTypes.node,
    children: PropTypes.node,
    history: PropTypes.object
};

export default withRouter(NotificationsPage);
