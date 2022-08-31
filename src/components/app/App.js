import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import recipe from "../../other/default-recipe"

import Header from '../header/Header'
import Footer from '../footer/Footer'
import Today from '../../pages/Today'
import Recipe from '../../pages/Recipe'
import Register from '../../pages/Register'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recipe: {
                title: recipe.title,
                summary: recipe.summary,
                image: recipe.image,
                steps: recipe.analyzedInstructions[0].steps,
                servings: recipe.servings,
                ingredients: recipe.extendedIngredients
            },
            servings: 1
        }

        this.decrementServings = this.decrementServings.bind(this)
        this.incrementServings = this.incrementServings.bind(this)
        this.reroll = this.reroll.bind(this)
    }

    decrementServings() {
        this.setState({
            servings: Math.max(this.state.servings - 1, 1)
        })
    }

    incrementServings() {
        this.setState({
            servings: this.state.servings + 1
        })
    }

    reroll() {
        alert("Reroll")
    }

    render() {

        const { recipe, servings } = this.state

        return (
        <BrowserRouter>
            <Header />
                <main className="main">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <h1>Root</h1>
                            }
                        />
                        <Route 
                            path="/today" 
                            element={
                                <Today
                                    recipe={recipe}
                                    servings={servings}
                                    decrementServings={this.decrementServings}
                                    incrementServings={this.incrementServings}
                                    reroll={this.reroll}
                                />
                            }
                        />
                        <Route 
                            path="/recipe" 
                            element={
                                <Recipe
                                    recipe={recipe}
                                    servings={servings}
                                />
                            }
                        />
                        <Route 
                            path="/settings" 
                            element={
                                <h1>Settings</h1>
                            }
                        />
                        <Route 
                            path="/register" 
                            element={
                                <Register />
                            }
                        />
                    </Routes>
                </main>
            <Footer />
        </BrowserRouter>
    )}
}

export default App