import React from "react"

import Ingredients from "../components/ingredients/Ingredients"

class Recipe extends React.Component {
    render() {

        const { recipe } = this.props

        return (
            <>
                <h1 className="page-title">Recipe</h1>
                <img className="recipe-image" src={recipe.image} alt={recipe.title} />
                <Ingredients ingredients={recipe.ingredients} />
            </>
        )
    }
}

export default Recipe