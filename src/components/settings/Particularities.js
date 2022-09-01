import React from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import apiConfig from "../../config/api.config"

const animatedComponents = makeAnimated();

class Particularities extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            particularity: []
        }
        this.fetchParticularity = this.fetchParticularity.bind(this)
    }

    componentDidMount() {
        this.fetchParticularity()
    }

    buildParticularity(data) {
        const particularity = []
        for (const [value, label] of Object.entries(data)) { 
            particularity.push({
                'value': value,
                'label': label
            })
        }
        return particularity
    }

    async fetchParticularity() {
        fetch(apiConfig.url + '/v0/recipe/getParticularities')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    particularity: this.buildParticularity(data.particularities),
                })
            })
            .catch(error => this.props.onError())
    }

    render() {
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
                <label className="label">Particularities</label>
                <Select
                styles={styles}
                className="multi-select"
                closeMenuOnSelect={false}
                defaultValue={this.buildParticularity(this.props.particularities)}
                components={animatedComponents}
                onChange={values => this.props.onChange(values)}
                isMulti
                options={this.state.particularity}
                />
            </>
        )
    }

}

export default Particularities