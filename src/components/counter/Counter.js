import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

class Counter extends React.Component {

    render() {

        const { counter, decrementCounter, incrementCounter } = this.props

        return (
            <div className="counter">
                <div className="counter-button" onClick={decrementCounter}>
                    <FontAwesomeIcon icon={faMinus} />
                </div>
                <p className="counter-value">{counter}</p>
                <div className="counter-button" onClick={incrementCounter}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        )
    }
}

export default Counter