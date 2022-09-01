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
        fetch(apiConfig.url + '/v0/recipe/getCookTypes')
            .then(response => response.json())
            .then(data => {
                this.setState({cookType: this.buildCookType(data.cookTypes)})
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
                <label className="label">Favorite kitchen</label>
                <Select
                styles={styles}
                className="multi-select"
                closeMenuOnSelect={false}
                defaultValue={this.buildCookType(this.props.cookTypes)}
                components={animatedComponents}
                onChange={values => this.props.onChange(values)}
                isMulti
                options={this.state.cookType}
                />
            </>
        )
    }

}

export default Cooktype