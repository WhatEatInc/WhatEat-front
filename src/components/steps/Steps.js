import React from "react"


class Steps extends React.Component {

    mapSteps() {
        return this.props.steps.map((step, index) => {
            return (
                <div key={index + "-step"} className="steps-step">
                    <h3  className="page-title">Step {step.number}</h3>
                    <p>{step.step}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="steps">
                <h2 className="page-title">Steps</h2>
                {this.mapSteps()}
            </div>
        )
    }
}

export default Steps