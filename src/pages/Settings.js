
import React from "react"
//import apiConfig from "../config/api.config"    
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'lemon', label: 'Lemon' }
  ]

class Settings extends React.Component {

    render() {
        return (
            <>
            <p>Salut</p>
            <Select options={options} />
            </>
    )}
}

export default Settings