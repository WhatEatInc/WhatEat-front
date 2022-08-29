
import React from "react"
import RecipeCard from "../components/recipe-card/RecipeCard"
import Counter from "../components/counter/Counter"

class Today extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            recipe: {
                title: "Pasta carbo",
                image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2F339f8f6f6d37e2168e3d9b7154bd5e35%2F16601743523C3C009C-3D61-43A0-8280-35A51E7B43C1.jpeg&w=651&h=436&c=sc&poi=face&q=60",
                description: "Bring a large pot of lightly salted water to a boil. Cook spaghetti in boiling water, stirring occasionally, until tender yet firm to the bite, about 12 minutes. Drain, toss spaghetti with 1 tablespoon olive oil, and set aside. Place diced bacon in a large skillet over medium heat; cook and stir until evenly browned, about 10 minutes. Drain bacon on paper towels, reserving 2 tablespoons bacon fat in the skillet. Add 1 tablespoon olive oil to bacon fat in the skillet. Add chopped onion and cook over medium heat until onion is translucent. Add minced garlic and cook until fragrant, about 1 minute. Add wine and cook 1 minute more.",
                url: "whateat-backend.herokuapp.com/",
                download: "whateat-backend.herokuapp.com/"
            },
            counter: 1
        }
        this.decrementCounter = this.decrementCounter.bind(this)
        this.incrementCounter = this.incrementCounter.bind(this)
    }

    decrementCounter() {
        this.setState({
            counter: Math.max(this.state.counter - 1, 1)
        })
    }

    incrementCounter() {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
        <>
            <h1>Today</h1>
            <RecipeCard recipe={this.state.recipe} />
            <Counter 
                decrementCounter={this.decrementCounter}
                incrementCounter={this.incrementCounter}
                counter={this.state.counter}
            />
            
        </>
    )}
}

export default Today