import React from "react"
import Toggle from 'react-toggle'

class Health extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.health,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(e) {
        this.setState({checked: e.target.checked})
    }

    render() {
        return (
        <>
            <h2>Healthy eating</h2>
            <Toggle
                defaultChecked={this.state.checked}
                icons={false}
                onChange={this.toggle} />
        </>
    )}
}

export default Health