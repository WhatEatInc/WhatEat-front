import React from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import apiConfig from "../../config/api.config"

const animatedComponents = makeAnimated();

class Allergens extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            allergens: []
        }
        this.fetchAllergens = this.fetchAllergens.bind(this)
    }

    componentDidMount() {
        this.fetchAllergens()
    }

    buildAllergens(data) {
        const allergens = []
        for (const [value, label] of Object.entries(data)) { 
            allergens.push({
                'value': value,
                'label': label
            })
        }
        return allergens
    }

    async fetchAllergens() {
        fetch(apiConfig.url + '/v0/recipe/getAllergens')
            .then(response => response.json())
            .then(data => {
                this.setState({allergens: this.buildAllergens(data.allergens)})
            })
            .catch(error => this.props.onError())
    }

    render() {
        return (
            <>
                <h2>Allergens</h2>
                <Select
                closeMenuOnSelect={false}
                defaultValue={this.buildAllergens(this.props.allergens)}
                components={animatedComponents}
                isMulti
                options={this.state.allergens}
                />
            </>
        )
    }

}

export default Allergens