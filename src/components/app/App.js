import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import Today from '../../pages/Today'
import Recipe from '../../pages/Recipe'
import Settings from '../../pages/Settings'

import apiConfig from "../../config/api.config"
import Cookies from 'js-cookie'

import utils from "../../utils/utils"
import ChangePassword from "../../pages/ChangePassword"

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recipe: null,
            servings: 1,
            isDownloading: false,
            isRerolling: false
        }

        this.decrementServings = this.decrementServings.bind(this)
        this.incrementServings = this.incrementServings.bind(this)
        this.reroll = this.reroll.bind(this)
        this.exportRecipe = this.exportRecipe.bind(this)
    }

    componentDidMount() {
        fetch(apiConfig.url + '/v0/recipe/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Error while fetching recipe")
            }
        })
        .then(data => {
            data.summary = utils.removeHtmlTags(data.summary)
            this.setState({ recipe: data })
        }).catch(error => alert(error))
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
        this.setState({ isRerolling: true })
        fetch(apiConfig.url + '/v0/recipe/reroll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }
        })
        .then(response => {
            if (response.ok) {
                this.setState({ isRerolling: false })
                return response.json()
            } else {
                throw new Error("Error while rerolling")
            }
        })
        .then(data => {
            data.summary = utils.removeHtmlTags(data.summary)
            this.setState({ recipe: data })
        }).catch(error => alert(error))
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

        if(this.state.recipe === null) {
            return
        }

        return (
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
                            isRerolling={this.state.isRerolling}
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
                    path="settings" 
                    element={
                        <Settings
                            handleLogout={this.props.handleLogout}
                        />
                    }
                />
                <Route 
                    path="edit"
                    element={
                        <ChangePassword />
                    }
                />
                <Route 
                    path="*" 
                    element={
                        <Navigate 
                            to="/app/today" 
                        />
                    }
                />
            </Routes>
    )}
}

export default App