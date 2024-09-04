import {ListGroup, Placeholder} from "react-bootstrap";

import { toFrac } from "../Utilities/fractions.js";

const IngredientListItems = ({ingredients}) => (
    ingredients
        .sort((a, b) => a.order - b.order)
        .map((entry, key) => (
            <li key={key}>
                {`${toFrac(entry?.amount)} ${entry?.unit} ${entry?.name} ${entry?.comment}`}
            </li>
        ))
);

const EmptyIngredientListItems = ({count}) => {
    const retComponents = Array.apply(null, Array(count))
        .map((entry, key) => (
            <li key={key}>
                <Placeholder xs={6} />
            </li>
        ));
    return (
        <div>{retComponents}</div>
    );
};

const IngredientsList = ({ingredients}) => {

    const ingredientListComponents = !ingredients ?
        <EmptyIngredientListItems count={ingredients?.length}/> :
        <IngredientListItems ingredients={ingredients}/>
    return (
        <ul>
            {ingredientListComponents}
        </ul>
    );
}

const RecipeIngredientsDisplay = ({ingredients}) => {

    return (
        <div className="mt-1 mb-0">
            <h3 className="mb-0">Ingredients:</h3>
            <IngredientsList ingredients={ingredients}/>
        </div>
    );
};

export default RecipeIngredientsDisplay;