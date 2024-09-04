import { Placeholder } from "react-bootstrap";

import RecipeIngredientsDisplay from "./RecipeIngredientsDisplay.jsx";

const RecipeDisplay = ({ recipe }) => {
    return (
        <>
            {<h1>{recipe?.name ? recipe?.name : <Placeholder xs={8} />}</h1>}
            <RecipeIngredientsDisplay ingredients={recipe?.ingredients} />
            {/*<RecipeInstructionsDisplay instructions={props.instructions} />*/}
            {/*<RecipeImagesDisplay images={props.images} />*/}
        </>
    );
}

export default RecipeDisplay;