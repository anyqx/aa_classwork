import React from 'react';

/*
Export an `EventForm` presentational component that creates a form to either
create or edit an event (it will be used by two separate containers). The form
should indicate whether it is a create or edit form based on the `formType`
prop. The form should initialize state to the `event` passed in from props. Use
controlled inputs and trigger the `submitEvent` passed in from the container 
upon submission. Use a text input for the description and a date input for the 
date.
*/

class EventForm extends React.Component{
    constructor(props){
        super(props);

        this.state = this.props.event;
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submitEvent(this.state);
    }

    updateField(field) {
        return e => this.setState({ [field]: e.target.value})
    }

    render(){
        return (
            <div>
                <h2>{this.props.formType}</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' onChange={this.updateField('description')} value={this.state.description}/>
                    <input type='date' onChange={this.updateField('date')} value={this.state.date} />
                    <button type='submit' value={this.props.formType} /> 
                </form>
            </div>
        )
    }
}

export default EventForm;