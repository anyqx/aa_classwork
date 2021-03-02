import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  REMOVE_EVENT,
} from '../actions/event_actions';
import merge from 'lodash/merge';

/*
Export an `EventsReducer` that takes in the old state and appropriately handles
all event actions.
*/

const EventsReducer = (oldState ={}, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
      case RECEIVE_EVENTS:
        return action.events;
      case RECEIVE_EVENT:
        nextState[action.event.id] = action.event;
        return nextState;
      case REMOVE_EVENT:
        delete nextState[action.eventId];
        return nextState;
      default:
        return oldState;
    }

}

export default EventsReducer;