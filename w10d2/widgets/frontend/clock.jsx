import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date()}
        this.tick.bind(this)
    }

    componentDidMount() {
        this.intervalId = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
       // this.intervalId = setInterval(this.tick, 1000)
        clearInterval(this.intervalId)
    }

    tick() {
        this.setState({time: new Date()})
    }

    render() {
        let hours = this.state.time.getHours();
        let minutes = this.state.time.getMinutes();
        let seconds= this.state.time.getSeconds();

        return(
            <>
                <h1>This is your clock!</h1>
            </>
        )
    }
}


export default Clock