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
        this.setState({
            allergens: this.fetchAllergens(),
        })
    }

    async fetchAllergens() {
        fetch(apiConfig.url + '/v0/recipe/getAllergen')
            .then(response => response.json())
            .then(data => {
                const allergens = []
                for (const [value, label] of Object.entries(data.Allergen)) { 
                    allergens.push({
                        'value': value,
                        'label': label
                    })
                }
                this.setState({allergens: allergens})
            })
            .catch(error => this.props.onError())
    }

    render() {
        return (
            <>
                <h2>Allergens</h2>
                <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={this.state.allergens}
                />
            </>
        )
    }

}

export default Allergens