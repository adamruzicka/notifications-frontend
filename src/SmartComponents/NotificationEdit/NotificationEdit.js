import _ from 'lodash';
import React, { Component } from 'react';
import {
    Button
} from '@patternfly/react-core';

import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    fetchEndpoint,
    createEndpoint,
    updateEndpoint,
    newEndpoint,
    fetchFilter,
    fetchApps
} from 'Store/actions';
import {
    Spinner
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import {
    SELECTED,
    LoadingState,
    NotificationsPage,
    FilterList,
    CustomInputFieldTemplate,
    CustomObjectFieldTemplate,
    CustomBooleanFieldTemplate,
    CustomFieldTemplate
} from 'PresentationalComponents';

const schema = {
    title: 'Basic details',
    type: 'object',
    required: [ 'name', 'url' ],
    properties: {
        name: { type: 'string', title: 'Name' },
        url: { type: 'string', title: 'URL' },
        active: { type: 'boolean', title: 'Active', default: true }
    }
};

const uiSchema = {
    name: {
        'ui:placeholder': 'New hook endpoint name'
    },
    url: {
        'ui:placeholder': 'https://...'
    }
};

const fields = {
    StringField: CustomInputFieldTemplate,
    BooleanField: CustomBooleanFieldTemplate
};

@registryDecorator()
export class NotificationEdit extends Component {
    static propTypes = {
        endpointId: PropTypes.number,
        endpoint: PropTypes.object,
        filter: PropTypes.object.isRequired,
        apps: PropTypes.object.isRequired,
        fetchEndpoint: PropTypes.func.isRequired,
        createEndpoint: PropTypes.func.isRequired,
        updateEndpoint: PropTypes.func.isRequired,
        fetchFilter: PropTypes.func.isRequired,
        fetchApps: PropTypes.func.isRequired,
        match: PropTypes.object,
        history: PropTypes.object,
        loading: PropTypes.bool,
        filterLoading: PropTypes.bool,
        appsLoading: PropTypes.bool,
        endpointErrors: PropTypes.array,
        submitting: PropTypes.bool
    }

    componentDidMount() {
        this.filterList = React.createRef();
        this.form = React.createRef();
        this.fetchData();
    }

    eventTypeLevels = (listState, eventType) => {
        let levelIds = [];
        Object.keys(eventType.levels).forEach((levelId) => {
            listState.selected.levelIds[levelId] && levelIds.push(levelId);
        });
        return levelIds;
    }

    appEventTypes = (listState, app) => {
        let levelIds = [];
        let eventTypeIds = [];
        Object.values(app.eventTypes).forEach((eventType) => {
            if (listState.selected.eventTypeIds[eventType.id]) {
                if (listState.toggles.eventTypeIds[eventType.id] !== SELECTED) {
                    eventTypeIds.push(eventType.id);
                } else {
                    const currentLevelIds = this.eventTypeLevels(listState, eventType);
                    if (currentLevelIds.length > 0) {
                        eventTypeIds.push(eventType.id);
                        levelIds = levelIds.concat(currentLevelIds);
                    }
                }
            }
        });

        return { eventTypeIds, levelIds };
    }

    buildFilter = (listState) => {
        let appIds = [];
        let eventTypeIds = [];
        let levelIds = [];

        Object.values(this.props.apps).forEach((app) => {
            if (listState.selected.appIds[app.id]) {
                if (listState.toggles.appIds[app.id] !== SELECTED) {
                    appIds.push(app.id);
                } else {
                    const { eventTypeIds: currentEventTypeIds, levelIds: currentLevelIds } = this.appEventTypes(listState, app);

                    if (currentEventTypeIds.length > 0) {
                        eventTypeIds = eventTypeIds.concat(currentEventTypeIds);
                        levelIds = levelIds.concat(currentLevelIds);
                        appIds.push(app.id);
                    }
                }
            }
        });

        return { app_ids: appIds, event_type_ids: eventTypeIds, level_ids: levelIds };
    }

    formSubmit = (data) => {
        let { active, name, url } = data.formData;
        const type = 'Endpoints::HttpEndpoint';

        const filter = this.buildFilter(this.filterList.current.state);

        let payload = {
            active,
            name,
            url,
            filter,
            type
        };

        const endpoint = this.singleEndpoint();
        ((endpoint) ? this.props.updateEndpoint(endpoint.id, payload) : this.props.createEndpoint(payload))
        .then(this.toIndex)
        .catch(() => {
            let errors = {};
            _.forEach(this.props.endpointErrors, (value) => {
                const pointer = value.source.pointer.split('/');
                const key = pointer[pointer.length - 1];
                errors[key] = {
                    errors: [ value.detail ]
                };
            });
            this.form.current.setState({
                errors,
                errorSchema: errors
            });
        });
    }

    fetchData = () => {
        let id = this.props.match.params.endpointId;
        this.props.fetchApps();

        if (id) {
            this.props.fetchEndpoint(id);
            this.props.fetchFilter(id);
        }
    }

    singleEndpoint = () =>
        this.props.endpoint ? this.props.endpoint[this.props.match.params.endpointId] : null;

    initialFormData = () => {
        const endpoint = this.singleEndpoint();
        return endpoint ? {
            name: endpoint.attributes.name,
            url: endpoint.attributes.url,
            active: endpoint.attributes.active
        } : {};
    }

    toIndex = () =>
        this.props.history.push('/list')

    render() {
        const endpoint = this.singleEndpoint();
        let action = this.props.match.params.endpointId && endpoint ? endpoint.attributes.name : 'New hook';
        const filter = this.props.match.params.endpointId ? this.props.filter : {};
        const mainStyle = { background: 'white', borderTop: '1px solid var(--pf-global--BorderColor--light)' };

        if (endpoint && !this.props.match.params.endpointId) {
            return <Redirect to={ `/edit/${ endpoint.id }` } />;
        }

        return <NotificationsPage title={ `${ action }` } mainStyle={ mainStyle }>
            <LoadingState
                loading={ this.props.loading || this.props.filterLoading || this.props.appsLoading }
                placeholder={ <Spinner centered /> }>
                <Form ref={ this.form } schema={ schema } className="pf-c-form"
                    uiSchema={ uiSchema }
                    fields={ fields }
                    ObjectFieldTemplate={ CustomObjectFieldTemplate }
                    FieldTemplate={ CustomFieldTemplate }
                    formData={ this.initialFormData() }
                    noValidate={ true }
                    showErrorList={ false }
                    onSubmit={ this.formSubmit } >

                    <FilterList ref={ this.filterList }
                        apps={ this.props.apps }
                        filter={ filter } />

                    <div>
                        <Button type='submit' variant="primary">Submit</Button> <Button onClick={ this.toIndex } variant="secondary">Cancel</Button>
                    </div>
                </Form>
            </LoadingState>
        </NotificationsPage>;
    }
}

const mapStateToProps = (state)  => {
    let { endpoint, loading, submitting, errors: endpointErrors } = state.endpoints;
    let { apps, loading: appsLoading } = state.apps;
    let { filter, loading: filterLoading } = state.filter;

    return {
        endpoint,
        apps,
        filter,
        loading,
        submitting,
        appsLoading,
        filterLoading,
        endpointErrors
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchEndpoint,
        createEndpoint,
        updateEndpoint,
        newEndpoint,
        fetchFilter,
        fetchApps
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationEdit));
