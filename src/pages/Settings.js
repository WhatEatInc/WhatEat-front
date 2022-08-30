import React from "react"
import User from '../components/settings/User'
import Allergens from '../components/settings/Allergens'
import Particularities from '../components/settings/Particularities'
import Cooktype from '../components/settings/Cooktype'
import Duration from '../components/settings/Duration'
import Health from '../components/settings/Health'
import Error from '../components/error/Error'
import apiConfig from "../config/api.config"

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            preferences: null
        }
        this.onError = this.onError.bind(this)
    }

    componentDidMount() {
        this.fetchPreferences()
    }

    async fetchPreferences() {
        fetch(apiConfig.url + '/v0/user/getPreferences')
            .then(response => response.json())
            .then(data => {
                this.setState({preferences: data})
            })
            .catch(error => this.onError())
    }

    onError() {
        this.setState({
            hasError: true
        })
    }

    render() {
        
        if(this.state.preferences === null) {
            return
        }

        if(this.state.hasError) {
            return (
                <Error />
            )
        } else {
            
            const {firstname, lastname } = this.state.preferences
            const {allergens, particularities, cookTypes, duration} = this.state.preferences.cook

            return (
                <>
                <h1>Settings</h1>
                <User lastname={lastname} firstname={firstname}/>
                <Allergens allergens={allergens} onError={this.onError} />
                <Particularities particularities={particularities} onError={this.onError} />
                <Cooktype cookTypes={cookTypes} onError={this.onError} />
                <Duration duration={duration} onError={this.onError} />
                <Health/>
                </>
        )}
    }
}

export default Settings