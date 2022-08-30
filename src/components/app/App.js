import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from '../header/Header'
import Footer from '../footer/Footer'
import Today from '../../pages/Today'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recipe: {
                title: "Pasta carbo",
                image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2F339f8f6f6d37e2168e3d9b7154bd5e35%2F16601743523C3C009C-3D61-43A0-8280-35A51E7B43C1.jpeg&w=651&h=436&c=sc&poi=face&q=60",
                description: "Bring a large pot of lightly salted water to a boil. Cook spaghetti in boiling water, stirring occasionally, until tender yet firm to the bite, about 12 minutes. Drain, toss spaghetti with 1 tablespoon olive oil, and set aside. Place diced bacon in a large skillet over medium heat; cook and stir until evenly browned, about 10 minutes. Drain bacon on paper towels, reserving 2 tablespoons bacon fat in the skillet. Add 1 tablespoon olive oil to bacon fat in the skillet. Add chopped onion and cook over medium heat until onion is translucent. Add minced garlic and cook until fragrant, about 1 minute. Add wine and cook 1 minute more.",
                url: "whateat-backend.herokuapp.com/",
                download: "whateat-backend.herokuapp.com/",
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
                                <h1>Recipe</h1>
                            }
                        />
                        <Route 
                            path="/settings" 
                            element={
                                <h1>Settings</h1>
                            }
                        />
                    </Routes>
                </main>
            <Footer />
        </BrowserRouter>
    )}
}

export default App