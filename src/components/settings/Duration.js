import React from "react"
import apiConfig from "../../config/api.config"

class Duration extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            duration: null
        }
        this.fetchDuration = this.fetchDuration.bind(this)
    }

    componentDidMount() {
        this.fetchDuration()
    }

    async fetchDuration() {
        fetch(apiConfig.url + '/v0/recipe/getDuration')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    duration: data.duration
                })
            })
            .catch(error => this.props.onError())
    }

    render() {

        if(this.state.duration === null) {
            return
        }

        return (
            <>
                <label className="label">Duration</label>
                <div className="duration">
                {
                    Object.keys(this.state.duration).map((index) => {
                        return (
                        <div key={index} className="duration-radio">
                            <input 
                                className="duration-radio-input"
                                type="radio" 
                                id={index}
                                name="duration" 
                                value={index}
                                defaultChecked={this.props.duration === parseInt(index)}
                                onChange={(e) => this.props.onChange(e.target.value)}
                            />
                            <label 
                                htmlFor={index}
                                className="duration-radio-label"
                            >
                                {this.state.duration[index]}
                            </label>
                        </div>
                        )
                    })
                }
                </div>
            </>
        )
    }

}

export default Duration