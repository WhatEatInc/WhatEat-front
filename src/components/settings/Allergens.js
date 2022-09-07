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
        // fix react-select bug when displaying only one value
        const styles = {
            valueContainer: (styles) => ({
                ...styles,
                '& div:first-of-type': {
                    width: 'fit-content !important'
                }
            })
        };

        return (
            <>
                <label className="label">Allergens</label>
                <Select
                styles={styles}
                className="multi-select"
                closeMenuOnSelect={false}
                defaultValue={this.buildAllergens(this.props.allergens)}
                components={animatedComponents}
                onChange={values => this.props.onChange(values)}
                isMulti
                options={this.state.allergens}
                />
            </>
        )
    }

}

export default Allergens