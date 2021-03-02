
import React from 'react';
import { connect } from 'react-redux';
import { requestEvent, updateEvent } from '../../actions/event_actions';
import EventForm from './event_form';

/*
Export a container component for the `EditEventForm` component given below that
will be used to edit an existing event. The `EditEventForm` component should 
fetch the event being edited when it successfully mounts to the DOM and will 
only render the `EventForm` once it has received that event.

In the container, pass in the event being edited as an `event` prop along with a
`formType` prop set to the string 'Update Event'. The edit form should pre-fill
each field with the event's values. Additionally, map in a function that will
dispatch `requestEvent` as a prop of the same name, and one that will dispatch 
the appropriate action to the store on form submission as a `submitEvent` prop.

**Do NOT modify the `render` function provided for the `EditEventForm`.**
*/

class EditEventForm extends React.Component {
  componentDidMount(){
    this.props.requestEvent(this.props.match.params.eventId)
  }
  render () {
    // DO NOT MODIFY THIS FUNCTION
    const { event, formType, submitEvent } = this.props;
    
    // Hint: The event will not exist on the first render - what do we need to do
    // to get it?
    if (!event) return null;
    return (
      <EventForm
      event={event}
      formType={formType}
      submitEvent={submitEvent} />
      );
    }
  }
  
  
  const mSTP = (state, ownProps) => {
    return {
      event: state.events[ownProps.match.params.eventId],
      formType: 'Update Event'
    }
  }
  
  const mDTP = dispatch => {
    return {
      requestEvent: eventId => dispatch(requestEvent(eventId)),
      submitEvent: event => dispatch(updateEvent(event))
    }
  }
  export default connect(mSTP, mDTP)(EditEventForm)