import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCircleNotch } from "@fortawesome/free-solid-svg-icons"

import Button from "../components/button/Button"
import Ingredients from "../components/ingredients/Ingredients"
import Steps from "../components/steps/Steps"

class Recipe extends React.Component {

    generateButtonContent() {
        if (this.props.isDownloading) {
            return (
                <>
                    <FontAwesomeIcon icon={faCircleNotch} spin /> Downloading
                </>
            )
        } else {
            return (
                <>
                    <FontAwesomeIcon icon={faDownload} /> Download
                </>
            )
        }
    }


    render() {

        const { recipe, servings } = this.props

        return (
            <>
                <div id="printable-recipe">
                    <h1 className="page-title">{recipe.title}</h1>
                    <img className="full" src={recipe.image} alt={recipe.title} />
                    <Ingredients servings={servings} baseServing={recipe.servings} ingredients={recipe.ingredients} />
                    <Steps steps={recipe.steps} />
                </div>
                <Button type="primary" className="btn-full btn-big" onClick={this.props.exportRecipe}>
                    {this.generateButtonContent()}
                </Button>
            </>
        )
    }
}

export default Recipe