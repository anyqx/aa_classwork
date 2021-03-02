import React from 'react';
import { Link } from 'react-router-dom';

/*
Write an `EventShow` presentational component that renders an event's 
information (description and date). This component should receive the event  
from the store as props via its container and fetch it once it has successfully
mounted to the DOM. Additionally, this component should contain a link back to 
the `EventIndex`.
*/

class EventShow extends React.Component {
    componentDidMount(){
        this.props.requestEvent(this.props.match.params.eventId) //or maybe fetchEvent?
    }
    render(){
        return (
            <div>
                <h2>{this.props.event.description}</h2>
                <h2>{this.props.event.date}</h2>
                <Link to='/'></Link>
            </div>
        )
    }

}

export default EventShow;