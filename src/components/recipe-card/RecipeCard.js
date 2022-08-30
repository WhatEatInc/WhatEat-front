import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'

class RecipeCard extends React.Component {
    render() {

        const { recipe } = this.props

        return (
            <div className="recipe-card">
                <img className="recipe-card-image" src={recipe.image} alt={recipe.title} />
                <div className="recipe-card-content">
                    <h4>{recipe.title}</h4>
                    <p>{recipe.description.slice(0, 200)}...</p>
                </div>
                <div className="recipe-card-actions">
                    <a className="btn btn-primary" href={recipe.url}>
                        <FontAwesomeIcon icon={faPlus} /> Read more
                    </a>
                    <a className="btn btn-secondary" href={recipe.download}>
                        <FontAwesomeIcon icon={faDownload} /> Download
                    </a>
                </div>
            </div>
        )
    }
}

export default RecipeCard