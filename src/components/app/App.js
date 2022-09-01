import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import recipe from "../../other/default-recipe"

import Header from '../header/Header'
import Footer from '../footer/Footer'
import Today from '../../pages/Today'
import Recipe from '../../pages/Recipe'
import Register from '../../pages/Register'
import Settings from '../../pages/Settings'
import Login from "../../pages/Login"

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
        this.exportRecipe = this.exportRecipe.bind(this)
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

    async exportRecipe() {    
        const element = document.querySelector("#printable-recipe")
        const canvas = await html2canvas(element, {
            useCORS: true,            
        })

        const data = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
            format: [element.offsetWidth, element.offsetHeight],
            compress: false
        })

        pdf.addImage(data, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight)
        pdf.save('print.pdf')
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
                                    exportRecipe={this.exportRecipe}
                                    ref={this.recipePrint}
                                />
                            }
                        />
                        <Route 
                            path="/settings" 
                            element={
                                <Settings />
                            }
                        />
                        <Route 
                            path="/register" 
                            element={
                                <Register />
                            }
                        />
                        <Route 
                            path="/login" 
                            element={
                                <Login />
                            }
                        />
                    </Routes>
                </main>
            <Footer />
        </BrowserRouter>
    )}
}

export default App