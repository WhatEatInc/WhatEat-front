import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from "@fortawesome/free-solid-svg-icons"


import Button from "../button/Button"

class Steps extends React.Component {

    mapSteps() {
        return this.props.steps.map((step, index) => {
            return (
                <>
                    <h3 className="page-title">Step {step.number}</h3>
                    <p>{step.step}</p>
                </>
            )
        })
    }

    render() {
        return (
            <div className="steps">
                <h2 className="page-title">Steps</h2>
                {this.mapSteps()}
                <Button type="secondary" className="btn-full btn-big" onClick={this.props.onClick}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </Button>
            </div>
        )
    }
}

export default Steps