import React from "react"

import Ingredients from "../components/ingredients/Ingredients"
import Steps from "../components/steps/Steps"

class Recipe extends React.Component {
    render() {

        const { recipe } = this.props

        return (
            <>
                <h1 className="page-title">Recipe</h1>
                <img className="full" src={recipe.image} alt={recipe.title} />
                <Ingredients ingredients={recipe.ingredients} />
                <Steps steps={recipe.steps} />
            </>
        )
    }
}

export default Recipe