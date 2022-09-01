import React from "react"
import Toggle from 'react-toggle'

class Healthy extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.healthy,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(e) {
        this.setState({checked: e.target.checked})
        this.props.onChange(e.target.checked)
    }

    render() {
        return (
        <>
            <label className="label">Healthy</label>
            <div className="healthy">
                <span className="healthy-text-toggle">Would you like to eat healthy ?</span>
                <Toggle
                    defaultChecked={this.state.checked}
                    icons={false}
                    onChange={this.toggle} />
            </div>
        </>
    )}
}

export default Healthy