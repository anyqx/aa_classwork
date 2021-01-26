import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date()}
    }

    tick() {
        this.setState({time: new Date()})
    }

    render() {
        let hours = this.date.time.getHours();
        let minutes = this.date.time.getMinutes();
        let seconds= this.date.time.getSeconds();

        return(
            <>
                <h1>This is your clock!</h1>
            </>
        )
    }
}


export default Clock