import React from "react"

class Ingredients extends React.Component {
    mapIngredients() {
        return this.props.ingredients.map((ingredient, index) => {
            return (
                <tr key={index + "-ingredient-" + ingredient.id} className="ingredients-table-row">
                    <td className="ingredients-table-amount">{ingredient.amount}  {ingredient.unit}</td>
                    <td className="ingredients-table-name">{ingredient.name}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="ingredients">
                <h2 className="page-title">Ingredients</h2>
                <table className="ingredients-table">
                    <tbody>
                        {this.mapIngredients()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Ingredients