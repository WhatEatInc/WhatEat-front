import React from "react"
import Toggle from 'react-toggle'

class Health extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false,
        }
    }

    handleTofuChange() {
        console.log("change")
    }

    render() {
        return (
        <>
            <h2>Healthy eating</h2>
            <Toggle
                defaultChecked={this.state.checked}
                icons={false}
                onChange={this.handleTofuChange} />
        </>
    )}
}

export default Health