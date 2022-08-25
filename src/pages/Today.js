
import React from "react"
import apiConfig from "../config/api.config"

class Today extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            today: null,
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.setState({
            today: this.fetchData(),
        })
    }

    async fetchData() {
        fetch(apiConfig.url)
            .then(response => response.json())
            .then(data => this.setState({
                today: data,
            }))
            .catch(error => this.setState({
                today: error,
            }))
    }

    render() {
        return (
        <p>{JSON.stringify(this.state.today)}</p>
    )}
}

export default Today