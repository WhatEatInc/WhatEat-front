import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class FeatureCard extends React.Component {
    render() {
        const { icon, title, subtitle, description } = this.props

        return (
            <div className="feature-card">
                <h3 className="feature-card-title">
                    <FontAwesomeIcon icon={icon} /> {title}
                </h3>
                <h4 className="feature-card-subtitle">{subtitle}</h4>
                <p className="feature-card-description">{description}</p>
            </div>
        )
    }
}

export default FeatureCard