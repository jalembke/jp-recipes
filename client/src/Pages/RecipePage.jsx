import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import { getRecipe } from "../Utilities/recipe_api.js";
import RecipeDisplay from "../Components/RecipeDisplay.jsx";


const RecipePage = () => {
    const params = useParams();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        getRecipe(params.id)
            .then(data => {
                setRecipe(data);
            });
    }, []);

    return (
        <Container className="col-md-5 my-1">
            <RecipeDisplay recipe={recipe} />
        </Container>
    );
}

export default RecipePage;