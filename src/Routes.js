import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from './Utilities/asyncComponent';
import some from 'lodash/some';

/**
 * Aysnc imports of components
 *
 * https://webpack.js.org/guides/code-splitting/
 * https://reactjs.org/docs/code-splitting.html
 **/

const NotificationsIndex = asyncComponent(() =>
  import(/* webpackChunkName: "NotificationsIndex" */ './SmartComponents/NotificationsIndex/NotificationsIndex'));

const NotificationEdit = asyncComponent(() =>
  import(/* webpackChunkName: "NotificationEdit" */ './SmartComponents/NotificationEdit/NotificationEdit'));

const paths = {
    notificationsIndex: '/list',
    notificationEdit: '/edit/:endpointId'
};

export const Routes = (props) => {
    const path = props.childProps.location.pathname;

    return (
        <Switch>
            <Route exact path={ paths.notificationsIndex } component={ NotificationsIndex } />
            <Route path={ paths.notificationEdit } component={ NotificationEdit } />

            { /* Finally, catch all unmatched routes */ }
            <Route render={ () => some(paths, p => p === path) ? null : (<Redirect to={ paths.notificationsIndex }/>) }/>
        </Switch>
    );
};

Routes.propTypes = {
    childProps: PropTypes.object.isRequired
};
