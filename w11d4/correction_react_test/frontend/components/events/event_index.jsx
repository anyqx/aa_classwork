import React from 'react';
import EventIndexItem from './event_index_item';
import { Link } from 'react-router-dom';

/*
Export an `EventIndex` presentational component that renders a list (`ul`) of
`EventIndexItems`. This component should receive `events` from the store as a 
prop via its container and fetch them once it has successfully mounted to the 
DOM. Below the `ul`, add a link to the new event page with text 'New Event'.
*/
 

class EventIndex extends React.Component {
    componentDidMount(){
        this.props.requestEvents();
    }
    render (){
        const events = this.props.events.map(event => {
            return <EventIndexItem key={event.id} event={event} deleteEvent={this.props.deleteEvent} />
        })

        /* interpolate events */
        return (
            <div>
                <ul>
                    {events}
                </ul>
                    <Link to='/events/new'>New Event</Link>
            </div>
        )
    }
}

export default EventIndex;