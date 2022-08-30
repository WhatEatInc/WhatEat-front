import React from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import apiConfig from "../../config/api.config"

const animatedComponents = makeAnimated();

class Cooktype extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cookType: []
        }
        this.fetchCookType = this.fetchCookType.bind(this)
    }

    componentDidMount() {
        this.fetchCookType()
    }

    buildCookType(data) {
        const cookType = []
        for (const [value, label] of Object.entries(data)) { 
            cookType.push({
                'value': value,
                'label': label
            })
        }
        return cookType
    }

    async fetchCookType() {
        fetch(apiConfig.url + '/v0/recipe/getCookType')
            .then(response => response.json())
            .then(data => {
                this.setState({cookType: this.buildCookType(data.CookType)})
            })
            .catch(error => this.props.onError())
    }

    render() {
        return (
            <>
                <h2>Favorite kitchen</h2>
                <Select
                closeMenuOnSelect={false}
                defaultValue={this.buildCookType(this.props.cookTypes)}
                components={animatedComponents}
                isMulti
                options={this.state.cookType}
                />
            </>
        )
    }

}

export default Cooktype