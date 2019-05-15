import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    ListItem,
    Stack,
    StackItem,
    Title
} from '@patternfly/react-core';

import { BulletlessList, RadioToggle, ALL, SELECTED } from 'PresentationalComponents';
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
            <RadioToggle
                scope={ `event-type-${ eventType.id }` }
                selectable={ levelsArray.length > 0 }
                subject="level"
                onToggle={ (value) => { this.setToggle(value, 'eventTypeIds', eventType.id); } }
                initial={ this.state.toggles.eventTypeIds[eventType.id] } >
                <BulletlessList>
                    { levelsArray.map(this.renderLevel) }
                </BulletlessList>
            </RadioToggle>
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
                { this.state.selected.eventTypeIds[eventType.id] &&
                      this.renderLevels(eventType, eventType.levels) }
            </ListItem>;

    eventTypesList = (eventTypes) => {
        const eventTypesArray = _.values(eventTypes);
        return eventTypesArray.length > 0 &&
            <BulletlessList>
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

    render() {
        const apps = _.values(this.props.apps);

        return (<Stack gutter="md">
            { apps.length > 0 &&
                <Title size='md'>Triggers</Title>
            }
            { apps.map((app) =>
                <StackItem key={ `app-item-${ app.id }` }>
                    <BulletlessList style={ { paddingLeft: '0em' } }>
                        <ListItem>
                            <Checkbox id={ `app-check-${ app.id}` }
                                data-event-type-id={ app.id }
                                label={ <strong>{ app.attributes.title }</strong> }
                                aria-label={ app.attributes.title }
                                onChange={ () => this.selectFilter('appIds', app.id) }
                                defaultChecked={ this.state.selected.appIds[app.id]  }/>
                        </ListItem>
                        { this.state.selected.appIds[app.id] &&
                                <ListItem>
                                    <RadioToggle
                                        scope={ `app-${ app.id }` }
                                        selectable={ Object.keys(app.eventTypes).length > 0 }
                                        subject="event type"
                                        onToggle={ (value) => { this.setToggle(value, 'appIds', app.id); } }
                                        initial={ this.state.toggles.appIds[app.id] } >
                                        { this.eventTypesList(app.eventTypes, app.id) }
                                    </RadioToggle>
                                </ListItem> }
                    </BulletlessList>
                </StackItem>
            ) }
        </Stack>);
    }
}

export default FilterList;
