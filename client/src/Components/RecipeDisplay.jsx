

const RecipeDisplay = ({ recipe }) => {
    return (
        <>
            <h1>{recipe?.name}</h1>
            {/*<RecipeIngredientsDisplay ingredients={props.ingredients} />*/}
            {/*<RecipeInstructionsDisplay instructions={props.instructions} />*/}
            {/*<RecipeImagesDisplay images={props.images} />*/}
        </>
    );
}

export default RecipeDisplay;