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
            user: null
        }
        this.onError = this.onError.bind(this)
        this.updateAllergens = this.updateAllergens.bind(this)
        this.updateParticularities = this.updateParticularities.bind(this)
        this.updateCookTypes = this.updateCookTypes.bind(this)
        this.updateDuration = this.updateDuration.bind(this)
        this.updateHealth = this.updateHealth.bind(this)
    }

    componentDidMount() {
        this.fetchPreferences()
    }

    async fetchPreferences() {
        fetch(apiConfig.url + '/v0/user/getPreferences')
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
        this.setState({
            user: {
                ...this.state.user,
                preferences: {
                    ...this.state.user.preferences,
                    allergens: this.formatObject(allergens)
                }
            }
        })
    }

    updateDuration(duration) {
        console.log(duration)
        this.setState({
            user: {
                ...this.state.user,
                preferences: {
                    ...this.state.user.preferences,
                    duration: duration
                }
            }
        })
    }

    updateParticularities(particularities) {
        this.setState({
            user: {
                ...this.state.user,
                preferences: {
                    ...this.state.user.preferences,
                    particularities: this.formatObject(particularities)
                }
            }
        })
    }

    updateCookTypes(cookTypes) {
        this.setState({
            user: {
                ...this.state.user,
                preferences: {
                    ...this.state.user.preferences,
                    cookTypes: this.formatObject(cookTypes)
                }
            }
        })
    }

    updateHealth(healthy) {
        this.setState({
            user: {
                ...this.state.user,
                preferences: {
                    ...this.state.user.preferences,
                    healthy: healthy
                }
            }
        })
    }

    async savePreferences(preferences) {
        /*
        for (const allergen of values) {
            preferences.allergens[allergen.label] = allergen.value
        }
        fetch(apiConfig.url + '/v0/user/setPreferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'crentials': 'include',
                'Cookie': 'token=' + Cookies.get('token')
            },
            body: JSON.stringify(preferences)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            }).catch(error => this.onError())
            */
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
            const {allergens, particularities, cookTypes, duration, health} = this.state.user.preferences

            return (
                <>
                <h1>Settings</h1>
                <User lastname={lastname} firstname={firstname}/>
                <Allergens allergens={allergens} onError={this.onError} onChange={this.updateAllergens}/>
                <Particularities particularities={particularities} onError={this.onError} onChange={this.updateParticularities}/>
                <Cooktype cookTypes={cookTypes} onError={this.onError} onChange={this.updateCookTypes}/>
                <Duration duration={duration} onError={this.onError} onChange={this.updateDuration}/>
                <Health health={health} onError={this.onError} onChange={this.updateHealth}/>
                </>
        )}
    }
}

export default Settings