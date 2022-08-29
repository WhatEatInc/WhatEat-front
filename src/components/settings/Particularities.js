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

    async fetchParticularity() {
        fetch(apiConfig.url + '/v0/recipe/getParticularity')
            .then(response => response.json())
            .then(data => {
                const particularity = []
                for (const [value, label] of Object.entries(data.Particularity)) { 
                    particularity.push({
                        'value': value,
                        'label': label
                    })
                }
                this.setState({
                    particularity: particularity,
                })
            })
            .catch(error => this.props.onError())
    }

    render() {
        return (
            <>
                <h2>Particularities</h2>
                <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={this.state.particularity}
                />
            </>
        )
    }

}

export default Particularities