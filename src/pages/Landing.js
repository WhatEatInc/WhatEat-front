import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faPaperPlane, faCutlery, faSnowflake, faCalendar } from "@fortawesome/free-solid-svg-icons"

import utils from "../utils/utils"

import Button from "../components/button/Button"
import FeatureCard from "../components/feature-card/FeatureCard"
import Header from "../components/header/Header"

class Landing extends React.Component {    
    render() {
        const { recipe } = this.props

        return (
            <main className='main-site'>
                <Header />
                <section className="landing">
                    <div className="recipe-card landing-card">
                        <img className="recipe-card-image" src={recipe.image} alt={recipe.title} />
                        <div className="recipe-card-content">
                            <h4>{recipe.title}</h4>
                            <p>{utils.removeHtmlTags(recipe.summary).slice(0, 100)}...</p>
                        </div>
                    </div>
                    <div className="landing-buttons">
                        <Button type="primary" className="btn-full btn-big">
                            <FontAwesomeIcon icon={faUser} /> Login
                        </Button>

                        <Button type="secondary" className="btn-full btn-big">
                            <FontAwesomeIcon icon={faPaperPlane} /> Register
                        </Button>
                    </div>
                </section>
                <section className="features">
                    <h2 className="page-title">How it works ?</h2>
                    <FeatureCard
                        icon={faCutlery}
                        title="Today"
                        subtitle="A random recipe each day"
                        description="When you start WhatEat, we offer you a delicicous recipe selected by the bests chefs, but as we don’t know you we can’t give you the best recipe :(. If you want to get the best fit for your daily meal please create an account and specify your culinary preferences so we can adapt and give you more reliable results. You are lactose or gluten intolerent, you want to eat vegan : don’t worry ! Just let us know in your user preferences !"
                    />
                    <FeatureCard
                        icon={faSnowflake}
                        title="Fridge"
                        subtitle="What do you have in your fridge ?"
                        description="Don’t know what to do with these leftovers from the fridge ? We’ll find you the best recipes you can cook with thoses strange ingredients bought last week. 
                        stop wasting your food !"
                    />
                    <FeatureCard
                        icon={faCalendar}
                        title="Week"
                        subtitle="Plan your week in advance"
                        description="You only go to your favorite hypermarket once a week and you don’t know what buying? We have the solution for you! With WhatEat Week, we can give a complete week of recipes selected by our app! Stop Buying processed food!"
                    />
                    <Button type="primary" className="btn-full btn-big">
                        <FontAwesomeIcon icon={faUser} /> Register
                    </Button>
                </section>
                <section className="presentation">
                    <h2 className="page-title">Who are we ?</h2>
                    <p className="presentation-text">
                    We are 5 students in the last year of the B.S in Computer Engineering in HEIG-VD. During our second summer university we have to realize a group work which consists in developing a web application. The main objectives of this project are to :
                    </p>
                    <ul className="presentation-list">
                        <li>Specify, code and test a large application</li>
                        <li>Acquire knowledge on new topics</li>
                        <li>Manage the problems of a project in a team</li>
                        <li>Write a report and present the work</li>
                    </ul>
                </section>
                <section className="privacy">
                    <h2 className="page-title">Data privacy</h2>
                    <p className="privacy-text">
                    We are here to help you find the best recipes for you today not to steal and sell your culinary preferences aswell as your private data !
                    </p>
                </section>
                <section className="contact">
                    <h2 className="page-title">Contact</h2>
                    <p className="contact-text">
                    You want to know more about us, contact us at <a href="mailto:whateatcorp@gmail.com">whateatcorp@gmail.com</a> and we will be happy to answer you. But please don’t spam us :( !
                    </p>
                </section>
                <footer className="main-footer">
                    <p className="main-footer-text">WhatEat © {new Date().getFullYear()}</p>
                    
                </footer>
            </main>
        )
    }
}

export default Landing