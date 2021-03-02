import * as EventAPIUtil from '../util/event_api_util';

/*
Export the following action constants:

1. `RECEIVE_EVENTS` (corresponding action should have a `events` payload)
2. `RECEIVE_EVENT` (corresponding action should have a `event` payload)
3. `REMOVE_EVENT` (corresponding action should have a `eventId` payload)

*/

export const RECEIVE_EVENTS ='RECEIVE_EVENTS';
export const RECEIVE_EVENT ='RECEIVE_EVENT';
export const REMOVE_EVENT ='REMOVE_EVENT';

const receiveEvents = events => {
    return {
        type: RECEIVE_EVENTS,
        events
    }
}
const receiveEvent = event => {
    return {
        type: RECEIVE_EVENT,
        event
    }
}
const removeEvent = eventId => {
    return {
        type: REMOVE_EVENT,
        eventId
    }
}

/*
Export the following thunk action creators with the specified parameters:

1. `requestEvents`
2. `requestEvent(eventId)`
3. `createEvent(event)`
4. `updateEvent(event)`
5. `deleteEvent(eventId)`
*/

export const requestEvents = () => dispatch => {
    return EventAPIUtil.fetchEvents()
        .then( events => dispatch(receiveEvents(events)))
}
export const requestEvent = eventId => dispatch => {
    return EventAPIUtil.fetchEvent(eventId)
        .then( event => dispatch(receiveEvent(event)))
}
export const createEvent = event => dispatch => {
    return EventAPIUtil.createEvent(event)
        .then( createdEvent => dispatch(receiveEvent(createdEvent)))
}
export const updateEvent = event => dispatch => {
    return EventAPIUtil.updateEvent(event)
        .then( updated => dispatch(receiveEvent(updated)))
}
export const deleteEvent = eventId => dispatch => {
    return EventAPIUtil.deleteEvent(eventId)
        .then(()=> dispatch(removeEvent(eventId)))
}

