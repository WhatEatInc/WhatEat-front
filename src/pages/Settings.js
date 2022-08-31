import React from "react"
import User from '../components/settings/User'
import Allergens from '../components/settings/Allergens'
import Particularities from '../components/settings/Particularities'
import Cooktype from '../components/settings/Cooktype'
import Duration from '../components/settings/Duration'
import Healthy from '../components/settings/Healthy'
import Error from '../components/error/Error'
import apiConfig from "../config/api.config"
import Cookies from 'js-cookie'

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            user: null
        }
        this.onError = this.onError.bind(this)
        this.updateAllergens = this.updateAllergens.bind(this)
        this.updateParticularities = this.updateParticularities.bind(this)
        this.updateCookTypes = this.updateCookTypes.bind(this)
        this.updateDuration = this.updateDuration.bind(this)
        this.updateHealthy = this.updateHealthy.bind(this)
    }

    componentDidMount() {
        this.fetchPreferences()
    }

    async fetchPreferences() {
        fetch(apiConfig.url + '/v0/user/getPreferences', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }})
            .then(response => response.json())
            .then(data => {
                this.setState({user: data})
            })
            .catch(error => this.onError())
    }

    formatObject(values) {
        const result = {}
        for (const allergen of values) {
            result[allergen.label] = allergen.value
        }
        return result
    }

    updateAllergens(allergens) {
        const user = {...this.state.user}
        user.preferences.allergens = this.formatObject(allergens);
        this.setState({user})
        this.savePreferences()
    }

    updateDuration(duration) {
        const user = {...this.state.user}
        user.preferences.duration = duration
        this.setState({user})
        this.savePreferences()
    }

    updateParticularities(particularities) {
        const user = {...this.state.user}
        user.preferences.particularities = this.formatObject(particularities)
        this.setState({user})
        this.savePreferences()
    }

    updateCookTypes(cookTypes) {
        const user = {...this.state.user}
        user.preferences.cookTypes = this.formatObject(cookTypes)
        this.setState({user})
        this.savePreferences()
    }

    updateHealthy(healthy) {
        const user = {...this.state.user}
        user.preferences.healthy = healthy
        this.setState({user})
        this.savePreferences()
    }

    async savePreferences() {
        fetch(apiConfig.url + '/v0/user/setPreferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => {
              // Display success message  
            }).catch(error => console.log(error))
    }

    onError() {
        this.setState({
            hasError: true
        })
    }

    render() {
        
        if(this.state.user === null) {
            return
        }

        if(this.state.hasError) {
            return (
                <Error />
            )
        } else {

            const {firstname, lastname } = this.state.user
            const {allergens, particularities, cookTypes, duration, healthy} = this.state.user.preferences

            return (
                <>
                <h1>Settings</h1>
                <User lastname={lastname} firstname={firstname}/>
                <Allergens allergens={allergens} onError={this.onError} onChange={this.updateAllergens}/>
                <Particularities particularities={particularities} onError={this.onError} onChange={this.updateParticularities}/>
                <Cooktype cookTypes={cookTypes} onError={this.onError} onChange={this.updateCookTypes}/>
                <Duration duration={duration} onError={this.onError} onChange={this.updateDuration}/>
                <Healthy healthy={healthy} onError={this.onError} onChange={this.updateHealthy}/>
                </>
        )}
    }
}

export default Settings