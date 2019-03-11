import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    List,
    ListItem
} from '@patternfly/react-core';

export class FilterList extends Component {
    static propTypes = {
        apps: PropTypes.array.isRequired,
        selectedAppEventTypes: PropTypes.shape({
            appIds: PropTypes.array,
            eventTypeIds: PropTypes.array
        })
    };

    eventTypeCheckboxChange = (id, appId) =>
        this.props = {
            ...this.props,
            selectedAppEventTypes: {
                appIds: this.removeOrAddId(this.props.selectedAppEventTypes.appIds, appId),
                eventTypeIds: this.removeOrAddId(this.props.selectedAppEventTypes.eventTypeIds, id)
            }
        }

    removeOrAddId = (array: [], id) =>
        array.indexOf(id) !== -1 ? array.filter((currentId) => currentId !== id) : [ ...array, id ]

    isEventTypeEnabled = (eventTypeId) =>
        this.props.selectedAppEventTypes.eventTypeIds.indexOf(parseInt(eventTypeId)) !== -1

    eventTypesListItem = (eventType, appId) =>
        <ListItem key={ `event-type-${ eventType.id}` }>
            <Checkbox id={ `event-type-check-${ eventType.id}` }
                data-event-type-id={ eventType.id }
                label={ eventType.name }
                aria-label={ eventType.name }
                onChange={ () => this.eventTypeCheckboxChange(eventType.id, appId) }
                isChecked={ this.isEventTypeEnabled(eventType.id) } />
        </ListItem>

    eventTypesList = (eventTypes, appId) =>
        eventTypes && eventTypes.length > 0 ?
            <List>
                { eventTypes.map((eventType) =>
                    this.eventTypesListItem(eventType, appId)
                ) }
            </List> : ''

    render() {
        return <List>
            { this.props.apps.map((app) =>
                <ListItem key={ `app-${ app.id }` }>
                    <strong>{ app.name }</strong>
                    { this.eventTypesList(app.event_types, app.id) }
                </ListItem>
            ) }
        </List>;
    }
}

export default FilterList;
