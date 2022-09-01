import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import Button from '../button/Button'

class User extends React.Component {

    render() {
        return (
            <>
                <span className="user">User : {this.props.firstname + ' ' + this.props.lastname}</span>
                <Button type="primary" className="btn-big">
                    <FontAwesomeIcon icon={faPen} /> Edit user settings
                </Button>
            </>
        )
    }

}

export default User