import React from "react"


class Steps extends React.Component {

    mapSteps() {
        return this.props.steps.map((parts, indexPart) => {
            return parts.steps.map((step, indexStep) => {
                return (
                    <div key={indexPart + indexStep + "-step"} className="steps-step">
                        <h3  className="page-title">Step {indexPart + 1}.{step.number}</h3>
                        <p>{step.step}</p>
                    </div>
                )
            })
        })
    }

    render() {
        return (
            <div className="steps">
                {this.mapSteps()}
            </div>
        )
    }
}

export default Steps