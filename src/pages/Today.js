import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice, faCircleNotch } from "@fortawesome/free-solid-svg-icons"

import RecipeCard from "../components/recipe-card/RecipeCard"
import Counter from "../components/counter/Counter"
import Button from "../components/button/Button"

class Today extends React.Component {

    generateButtonContent() {
        if (this.props.isRerolling) {
            return (
                <>
                    <FontAwesomeIcon icon={faCircleNotch} spin /> Rerolling
                </>
            )
        } else {
            return (
                <>
                    <FontAwesomeIcon icon={faDice} /> Reroll
                </>
            )
        }
    }

    render() {
        const { recipe, servings, decrementServings, incrementServings, reroll } = this.props

        return (
        <>
            <h1 className="page-title">Today</h1>
            <RecipeCard recipe={recipe} exportRecipe={this.props.exportRecipe}/>
            <Counter 
                decrementCounter={decrementServings}
                incrementCounter={incrementServings}
                counter={servings}
            />
            <Button onClick={reroll} type="primary" className="btn-full btn-big">
                {this.generateButtonContent()}
            </Button>
        </>
        )
    }
}

export default Today