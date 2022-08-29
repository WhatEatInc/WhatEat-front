import React from "react"
import User from '../components/settings/User'
import Allergens from '../components/settings/Allergens'
import Particularities from '../components/settings/Particularities'
import Cooktype from '../components/settings/Cooktype'
import Cooktime from '../components/settings/Cooktime'
import Health from '../components/settings/Health'
import Error from '../components/error/Error'

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
        this.onError = this.onError.bind(this)
    }

    onError() {
        this.setState({
            hasError: true
        })
    }

    render() {
        
        if(this.state.hasError) {
            return (
                <Error />
            )
        } else {
            return (
                <>
                <h1>Settings</h1>
                <User />
                <Allergens />
                <Particularities onError={this.onError} />
                <Cooktype onError={this.onError} />
                <Cooktime />
                <Health/>
                </>
        )}
    }
}

export default Settings