import { connect } from 'react-redux';
import { requestEvents, deleteEvent } from '../../actions/event_actions';
import EventIndex from './event_index';

/*
Export a container component for the `EventIndex` that maps an array of all 
events from the store as an `events` prop. Additionally, it should map in 
functions that will dispatch `requestEvents` and `deleteEvent` to the store as 
props of the same name.
*/

const mSTP = state => ({
    events: Object.values(state.events)
})

const mDTP = dispatch => ({
    requestEvents: ()=> dispatch(requestEvents()),
    deleteEvent: eventId => dispatch(deleteEvent())
})


export default connect(mSTP, mDTP)(EventIndex);