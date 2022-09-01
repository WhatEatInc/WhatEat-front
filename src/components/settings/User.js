import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import Button from '../button/Button'

class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <>
                <p>User : {this.props.firstname + ' ' + this.props.lastname}</p>
                <Button type="secondary">
                    <FontAwesomeIcon icon={faPen} /> Edit user settings
                </Button>
            </>
        )
    }

}

export default User