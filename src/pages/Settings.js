import React from "react"
import User from '../components/settings/User'
import Allergens from '../components/settings/Allergens'
import Particularities from '../components/settings/Particularities'
import Cooktype from '../components/settings/Cooktype'
import Cooktime from '../components/settings/Cooktime'
import Health from '../components/settings/Health'

class Settings extends React.Component {

    render() {
        return (
            <>
            <h1>Settings</h1>
            <User />
            <Allergens />
            <Particularities />
            <Cooktype />
            <Cooktime />
            <Health/>
            </>
    )}
}

export default Settings