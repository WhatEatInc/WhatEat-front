import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


class RecipeCard extends React.Component {
    render() {

        const { recipe } = this.props

        return (
            <div className="recipe-card">
                <img className="recipe-card-image" src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-content">
                    <h4>{recipe.title}</h4>
                    <p>{recipe.summary.slice(0, 200)}...</p>
                </div>
                <div className="recipe-card-actions">
                    <Link className="btn btn-primary" to="/app/recipe">
                        <FontAwesomeIcon icon={faPlus} className="btn-icon" /> Read more
                    </Link>
                </div>
            </div>
        )
    }
}

export default RecipeCard