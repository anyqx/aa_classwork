import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import EventForm from './event_form';

/*
Export a container component for the `EventForm` that will be used to create a
new event. Map in an event object with empty strings for each field as an 
`event` prop along with a `formType` prop set to the string 'Create Event'.
Additionally, map in a function that will dispatch the appropriate action to 
the store on form submission as `submitEvent`.
*/

const mSTP = state => ({
    event: {
        description: '',
        date: ''
    },
    formType: 'Create Event'
})

const mDTP = dispatch => ({
    submitEvent: event => dispatch(createEvent(event))
})

export default connect(mSTP, mDTP)(EventForm);