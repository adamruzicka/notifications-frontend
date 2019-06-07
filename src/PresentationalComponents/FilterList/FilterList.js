import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Grid,
    GridItem,
    ListItem,
    Title
} from '@patternfly/react-core';

import { BulletlessList, ALL, SELECTED } from 'PresentationalComponents';
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
        }, toggles: {
            appIds: {}, eventTypeIds: {}
        }};

        this.state = initialState;
    }

    static getDerivedStateFromProps(props, state) {
        return FilterList.fillMissingSelection(props, state);
    }

    static fillMissingSelection = (props, state) => {
        let stateCopy = state;
        let filter = props.filter;

        if (filter) {
            [ 'app', 'eventType', 'level' ].forEach((kind) => {
                const dict = filter[kind + 's'];
                if (dict) {
                    const key = kind + 'Ids';
                    Object.values(dict).forEach((entry) => {
                        if (stateCopy.selected[key][entry.id] === undefined) {
                            stateCopy.selected[key][entry.id] = true;
                        }
                    });
                }
            });

            Object.values(props.apps).forEach((app) => {
                if (stateCopy.toggles.appIds[app.id] === undefined) {
                    const initial = Object.keys(app.eventTypes).some((id) => stateCopy.selected.eventTypeIds[id]) ? SELECTED : ALL;
                    stateCopy.toggles.appIds[app.id] = initial;
                }

                Object.values(app.eventTypes).forEach((eventType) => {
                    if (stateCopy.toggles.eventTypeIds[eventType.id] === undefined) {
                        const initial = Object.keys(eventType.levels).some((id) => stateCopy.selected.levelIds[id]) ? SELECTED : ALL;
                        stateCopy.toggles.eventTypeIds[eventType.id] = initial;
                    }
                });
            });
        }

        return stateCopy;
    }

    componentDidMount() {
        const stateCopy = FilterList.fillMissingSelection(this.props, this.state);
        this.setState(stateCopy);
    }

    renderLevel = (level) =>
        level.attributes &&
            <ListItem key={ `level-${ level.id}` }>
                <Checkbox id={ `level-check-${ level.id}` }
                    data-event-type-id={ level.id }
                    label={ level.attributes.title }
                    aria-label={ level.attributes.title }
                    onChange={ () => this.selectFilter('levelIds', level.id) }
                    defaultChecked={ this.state.selected.levelIds[level.id] } />
            </ListItem>;

    setToggle = (value, what, id) => {
        const newState = { ...this.state };
        newState.toggles = { ...newState.toggles, [what]: { ...newState.toggles[what], [id]: value }};
        this.setState(newState);
    }

    renderLevels = (eventType, levels) => {
        const levelsArray = _.values(levels);

        return (
            <BulletlessList>
                { levelsArray.map(this.renderLevel) }
            </BulletlessList>
        );
    }

    eventTypesListItem = (eventType) =>
        eventType.attributes &&
            <ListItem key={ `event-type-${ eventType.id}` }>
                <Checkbox id={ `event-type-check-${ eventType.id}` }
                    data-event-type-id={ eventType.id }
                    label={ eventType.attributes.title }
                    aria-label={ eventType.attributes.title }
                    onChange={ () => this.selectFilter('eventTypeIds', eventType.id) }
                    defaultChecked={ this.state.selected.eventTypeIds[eventType.id] } />
                { this.renderLevels(eventType, eventType.levels) }
            </ListItem>;

    eventTypesList = (eventTypes) => {
        const eventTypesArray = _.values(eventTypes);
        return eventTypesArray.length > 0 &&
            <BulletlessList style={ { paddingLeft: '0em' } }>
                { eventTypesArray.map((eventType) =>
                    this.eventTypesListItem(eventType)
                ) }
            </BulletlessList>;
    }

    selectFilter = (arrayName, id) => {
        let newState = { ...this.state };
        newState.selected[arrayName][id] = newState.selected[arrayName][id] ? false : true;
        this.setState(newState);
    }

    appSelected = (app) => {
        let newState = { ...this.state };
        if (newState.selected.appIds[app.id] === undefined) {
            Object.values(app.eventTypes).forEach((eventType) => {
                newState.selected.eventTypeIds[eventType.id] = true;
                Object.values(eventType.levels).forEach((level) => newState.selected.levelIds[level.id] = true);
            });
        }

        newState.selected.appIds[app.id] = newState.selected.appIds[app.id] ? false : true;
        this.setState(newState);
    }

    render() {
        const apps = _.values(this.props.apps);

        return (
            <React.Fragment>
                { apps.length > 0 &&
                    <Title size='md'>Triggers</Title>
                }
                <Grid xl={ 4 } md={ 3 } xs={ 1 } gutter="md">
                    { apps.map((app) =>
                        <GridItem key={ `app-item-${ app.id }` }>
                            <Card>
                                <CardHeader>
                                    <Checkbox id={ `app-check-${ app.id}` }
                                        data-event-type-id={ app.id }
                                        label={ <strong>{ app.attributes.title }</strong> }
                                        aria-label={ app.attributes.title }
                                        onChange={ () => this.appSelected(app) }
                                        defaultChecked={ this.state.selected.appIds[app.id]  }/>
                                </CardHeader>
                                { this.state.selected.appIds[app.id] && _.keys(app.eventTypes).length > 0 &&
                                    <CardBody>
                                        { this.eventTypesList(app.eventTypes, app.id) }
                                    </CardBody>
                                }
                            </Card>
                        </GridItem>
                    ) }
                </Grid>
            </React.Fragment>);
    }
}

export default FilterList;
