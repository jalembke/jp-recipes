import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import { getRecipe } from "../API/recipe_api.js";
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
        <Container className="px-5">
            <RecipeDisplay recipe={recipe} />
        </Container>
    );
}

export default RecipePage;