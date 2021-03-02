import { connect } from 'react-redux';
import { requestEvent, requestEvents } from '../../actions/event_actions';
import EventShow from './event_show';

/*
Export a container component for the `EventShow` that maps in the appropriate
event from the store as an `event` prop. Additionally, it should map in
a function that will dispatch `requestEvent` to the store as a prop of the same
name.
*/

const mSTP = (state, ownProps) => {
    return{
        event: state.events[ownProps.match.params.eventId]
    }

}

const mDTP = dispatch => {
    return {
        requestEvent: eventId => dispatch(requestEvent(eventId))
    }
}

export default connect(mSTP, mDTP)(EventShow)