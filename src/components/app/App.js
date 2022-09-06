import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import recipe from "../../other/default-recipe"

import Today from '../../pages/Today'
import Recipe from '../../pages/Recipe'
import Settings from '../../pages/Settings'

import Cookies from 'js-cookie'
import apiConfig from "../../config/api.config"

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
            servings: 1,
            isDownloading: false,
            isLoggedIn: false
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

    componentDidMount() {
        this.authGuard()
    }

    // function to guard the component for private access
    authGuard() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + Cookies.get('token')},
        }
    
        fetch(apiConfig.url + "/v0/user/test", requestOptions)
        .then(response => {
            if(response.ok){
                this.setState({
                    isLoggedIn: true,
                })
                return true
            }
            else{
                Cookies.remove('token')
                this.setState({
                    isLoggedIn: false,
                })
                return false
        }})
        .catch(error => (this.setState({errorMessage: error.message})));
    }

    async exportRecipe() {    
        this.setState({
            isDownloading: true
        })

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

        this.setState({
            isDownloading: false
        })
    }

    render() {

        const { recipe, servings } = this.state

        return (
        !this.props.isLoggedIn ?
        <Navigate to="/login" /> :
            <Routes>
                <Route 
                    path="today" 
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
                    path="recipe" 
                    element={
                        <Recipe
                            recipe={recipe}
                            servings={servings}
                            exportRecipe={this.exportRecipe}
                            isDownloading={this.state.isDownloading}
                        />
                    }
                />
                <Route 
                    path="/settings" 
                    element={
                        <Settings
                            handleLogout={this.props.handleLogout}
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/app/today" />} />
            </Routes>
    )}
}

export default App