import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    List,
    ListItem,
    Card,
    CardBody,
    Gallery,
    GalleryItem
} from '@patternfly/react-core';
import _ from 'lodash';

export class FilterList extends Component {
    static propTypes = {
        apps: PropTypes.object.isRequired,
        filter: PropTypes.object
    };

    constructor(props) {
        super(props);
        const initialState = { selected: {
            appIds: {}, levelIds: {}, eventTypeIds: {}
        }};

        this.state = initialState;
    }

    static getDerivedStateFromProps(props, state) {
        let stateCopy = state;

        if (props.filter) {
            if (props.filter.apps) {
                Object.values(props.filter.apps).forEach((app) => stateCopy.selected.appIds[app.id] = true);
            }

            if (props.filter.eventTypes) {
                Object.values(props.filter.eventTypes).forEach((eventType) => stateCopy.selected.eventTypeIds[eventType.id] = true);
            }

            if (props.filter.levels) {
                Object.values(props.filter.levels).forEach((level) => stateCopy.selected.levelIds[level.id] = true);
            }
        }

        return stateCopy;
    }

    componentDidMount() {
        const stateCopy = this.state;
        const props = this.props;

        Object.keys(props.apps).forEach((key) => {
            stateCopy.selected.appIds[key] = false;
            const app = props.apps[key];
            if (app.eventTypes) {
                Object.keys(app.eventTypes).forEach((eventKey) => {
                    stateCopy.selected.eventTypeIds[eventKey] = false;
                    let eventType = app.eventTypes[eventKey];
                    if (eventType.levels) {
                        Object.keys(eventType.levels).forEach((levelKey) => {
                            stateCopy.selected.levelIds[levelKey] = false;
                        });
                    }
                });
            }
        });

        if (props.filter) {
            if (props.filter.apps) {
                Object.values(props.filter.apps).forEach((app) => stateCopy.selected.appIds[app.id] = true);
            }

            if (props.filter.eventTypes) {
                Object.values(props.filter.eventTypes).forEach((eventType) => stateCopy.selected.eventTypeIds[eventType.id] = true);
            }

            if (props.filter.levels) {
                Object.values(props.filter.levels).forEach((level) => stateCopy.selected.levelIds[level.id] = true);
            }
        }

        this.setState(stateCopy);
    }

    renderLevel = (level) =>
        level.attributes ?
            <ListItem key={ `level-${ level.id}` }>
                <Checkbox id={ `level-check-${ level.id}` }
                    data-event-type-id={ level.id }
                    label={ level.attributes.title }
                    aria-label={ level.attributes.title }
                    onChange={ () => this.selectFilter('levelIds', level.id) }
                    defaultChecked={ this.state.selected.levelIds[level.id] } />
            </ListItem> : '';

    renderLevels = (levels) => {
        const levelsArray = _.values(levels);
        return levelsArray.length > 0 ?
            <List>
                { levelsArray.map((level) =>
                    this.renderLevel(level)
                ) }
            </List> : '';
    }

    eventTypesListItem = (eventType) =>
        eventType.attributes ?
            <ListItem key={ `event-type-${ eventType.id}` }>
                <Checkbox id={ `event-type-check-${ eventType.id}` }
                    data-event-type-id={ eventType.id }
                    label={ eventType.attributes.name }
                    aria-label={ eventType.attributes.name }
                    onChange={ () => this.selectFilter('eventTypeIds', eventType.id) }
                    defaultChecked={ this.state.selected.eventTypeIds[eventType.id] } />
                { this.renderLevels(eventType.levels) }
            </ListItem> : '';

    eventTypesList = (eventTypes) => {
        const eventTypesArray = _.values(eventTypes);
        return eventTypesArray.length > 0 ?
            <List>
                { eventTypesArray.map((eventType) =>
                    this.eventTypesListItem(eventType)
                ) }
            </List> : '';
    }

    selectFilter = (arrayName, id) => {
        let newState = { ...this.state };
        newState.selected[arrayName][id] = newState.selected[arrayName][id] ? false : true;
        this.setState(newState);
    }

    render() {
        const apps = _.values(this.props.apps);

        return (<Gallery gutter="md">
            { apps.map((app) =>
                <GalleryItem key={ `app-item-${ app.id }` }>
                    <Card key={ `app-${ app.id }` }>
                        <CardBody>
                            <Checkbox id={ `app-check-${ app.id}` }
                                data-event-type-id={ app.id }
                                label={ app.attributes.name }
                                aria-label={ app.attributes.name }
                                onChange={ () => this.selectFilter('appIds', app.id) }
                                defaultChecked={ this.state.selected.appIds[app.id]  } />
                            { this.eventTypesList(app.eventTypes, app.id) }
                        </CardBody>
                    </Card>
                </GalleryItem>
            ) }
        </Gallery>);
    }
}

export default FilterList;
