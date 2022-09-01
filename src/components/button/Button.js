import React from "react"

class Button extends React.Component {
    render() {
        const { children, type, onClick, className } = this.props;

        const btnClass = "btn btn-" + type + " " + className;

        return (
            <button className={btnClass} onClick={onClick}>
                {children}
            </button>
        )
    }   
}

export default Button