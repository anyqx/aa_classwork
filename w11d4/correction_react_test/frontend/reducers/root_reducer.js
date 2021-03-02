import EventsReducer from './events_reducer';
import { combineReducers } from 'redux';

/*
Export a `RootReducer` that sets up an `events` slice of state, which delegates
to the `EventsReducer`.
*/

const RootReducer = combineReducers ({
    events: EventsReducer
})

export default RootReducer;