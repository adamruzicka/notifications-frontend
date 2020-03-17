import _ from 'lodash';
import React, { Component } from 'react';
import {
    Button,
    Stack,
    StackItem,
    Switch,
    PageSection
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
} from '@redhat-cloud-services/frontend-components';
import registryDecorator from '@redhat-cloud-services/frontend-components-utilities/files/Registry';
import {
    LoadingState,
    NotificationsPage,
    FilterList,
    CustomInputFieldTemplate,
    CustomObjectFieldTemplate,
    CustomFieldTemplate
} from 'PresentationalComponents';

const schema = {
    title: 'Basic details',
    type: 'object',
    required: [ 'name', 'url' ],
    properties: {
        name: { type: 'string', title: 'Name' },
        url: { type: 'string', title: 'URL' }
    }
};

class CustomSwitch extends React.Component {
    static propTypes = {
        default: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            active: props.default
        };
        this.handleChange = active => {
            this.setState({ active });
        };
    }

    render() {
        const { active } = this.state;
        return (
            <Switch id="endpoint_enabled" isChecked={ active } onChange={ this.handleChange } />
        );
    }
}

const uiSchema = {
    name: {
        'ui:placeholder': 'New hook endpoint name'
    },
    url: {
        'ui:placeholder': 'https://...'
    }
};

const fields = {
    StringField: CustomInputFieldTemplate
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

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.filterList = React.createRef();
        this.form = React.createRef();
        this.switch = React.createRef();
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
                const currentLevelIds = this.eventTypeLevels(listState, eventType);
                if (Object.values(eventType.levels).length === 0 || currentLevelIds.length > 0) {
                    eventTypeIds.push(eventType.id);
                    levelIds = levelIds.concat(currentLevelIds);
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
                const { eventTypeIds: currentEventTypeIds, levelIds: currentLevelIds } = this.appEventTypes(listState, app);

                if (currentEventTypeIds.length > 0) {
                    eventTypeIds = eventTypeIds.concat(currentEventTypeIds);
                    levelIds = levelIds.concat(currentLevelIds);
                    appIds.push(app.id);
                }
            }
        });

        return { app_ids: appIds, event_type_ids: eventTypeIds, level_ids: levelIds };
    }

    formSubmit = () => {
        let { name, url } = this.form.current.state.formData;
        const type = 'Endpoints::HttpEndpoint';

        const filter = this.buildFilter(this.filterList.current.state);
        const active = this.switch.current.state.active;

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
        let endpoint = this.singleEndpoint();

        if (this.form !== undefined && this.form.current !== null) {
            const { name, url } = this.form.current.state.formData;
            endpoint = { attributes: { name, url }};
        }

        return endpoint ? {
            name: endpoint.attributes.name,
            url: endpoint.attributes.url
        } : {};
    }

    endpointLoaded = (endpoint) =>
        this.props.match.params.endpointId && endpoint;

    toIndex = () =>
        this.props.history.push('/list')

    render() {
        const endpoint = this.singleEndpoint();
        let action = this.endpointLoaded(endpoint) ? endpoint.attributes.name : 'New hook';
        const active = (this.state === null) ? (this.endpointLoaded(endpoint) ? endpoint.attributes.active : true) : this.state.active;
        const filter = this.props.match.params.endpointId ? this.props.filter : {};
        const mainStyle = { background: 'white', borderTop: '1px solid var(--pf-global--BorderColor--light)' };

        if (endpoint && !this.props.match.params.endpointId) {
            return <Redirect to={ `/edit/${ endpoint.id }` } />;
        }

        const loading = this.props.loading || this.props.filterLoading || this.props.appsLoading;

        const appendix =
            <PageSection>
                <Stack gutter="sm">
                    <StackItem>
                        <FilterList ref={ this.filterList }
                            apps={ this.props.apps }
                            filter={ filter } />
                    </StackItem>
                    <StackItem>
                        <div>
                            <Button onClick={ this.formSubmit } type='submit' variant="primary">Submit</Button>
                            { ' ' }
                            <Button onClick={ this.toIndex } variant="secondary">Cancel</Button>
                        </div>
                    </StackItem>
                </Stack>
            </PageSection>;

        const toggle =
            <div>
                Active
                { ' ' }
                <CustomSwitch default={ active } ref={ this.switch } />
            </div>;

        return <NotificationsPage
            title={ `${ action }` }
            mainStyle={ mainStyle }
            appendix={ !loading && appendix }
            rightHeader={ !this.props.loading && toggle }>
            <LoadingState
                loading={ loading }
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
                    <Button type='submit' variant="primary" style={ { display: 'none' } }>Submit</Button>
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
