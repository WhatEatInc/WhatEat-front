import React from "react"

class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <>
                <span>User : </span>
                <span>{this.props.firstname + ' ' + this.props.lastname}</span>
                <button>Modifier</button>
            </>
        )
    }

}

export default User