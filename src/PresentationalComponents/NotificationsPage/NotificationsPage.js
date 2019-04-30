import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';
import {
    Breadcrumb,
    BreadcrumbItem
} from '@patternfly/react-core';

import PropTypes from 'prop-types';

export class NotificationsPage extends Component {
    toIndex = (event) => {
        event.preventDefault();
        this.props.history.push('/list');
    }

    showRootLink = () =>
        this.props.history && this.props.history.location.pathname !== '/list' ?
            <BreadcrumbItem to='#' onClick={ this.toIndex }>Hooks</BreadcrumbItem>
            : '';

    showBreadcrumb = () =>
        this.props.showBreadcrumb && <Breadcrumb style={ { marginLeft: 'calc(var(--pf-c-content--ol--MarginLeft) * -1 * 2)' } }>
            { this.showRootLink() }
            <BreadcrumbItem isActive style={ { marginTop: 0 } }>{ this.props.title }</BreadcrumbItem>
        </Breadcrumb>

    render() {
        const { title, children } = this.props;

        return (
            <Fragment>
                <PageHeader>
                    { this.showBreadcrumb() }
                    <PageHeaderTitle title={ title } />
                </PageHeader>
                <Main style={ this.props.mainStyle }>
                    { children }
                </Main>
            </Fragment>
        );
    }
};

NotificationsPage.defaultProps = {
    showBreadcrumb: true
};

NotificationsPage.propTypes = {
    title: PropTypes.string.isRequired,
    rightBar: PropTypes.node,
    showBreadcrumb: PropTypes.bool,
    children: PropTypes.node,
    history: PropTypes.object,
    mainStyle: PropTypes.object
};

export default withRouter(NotificationsPage);
