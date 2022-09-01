import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from "@fortawesome/free-solid-svg-icons"

import Button from "../components/button/Button"
import Ingredients from "../components/ingredients/Ingredients"
import Steps from "../components/steps/Steps"

class Recipe extends React.Component {
    render() {

        const { recipe, servings } = this.props

        return (
            <>
                <div id="printable-recipe">
                    <h1 className="page-title">Recipe</h1>
                    <img className="full" src={recipe.image} alt={recipe.title} />
                    <Ingredients servings={servings} baseServing={recipe.servings} ingredients={recipe.ingredients} />
                    <Steps steps={recipe.steps} />
                </div>
                <Button type="primary" className="btn-full btn-big" onClick={this.props.exportRecipe}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </Button>
            </>
        )
    }
}

export default Recipe