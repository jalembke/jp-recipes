/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();


const isDefined = (value) => (
    value !== undefined && value !== null && typeof(value) !== 'undefined'
);
const isNonEmptyString = (value) => (
    isDefined(value) && typeof(value) === "string" && value.length > 0
)
const resolveReference = async (reference) => {
    const doc = await reference.get();
    return doc.data();
};
const getDocuments = async(collection_name) => {
    const snapshot = await getFirestore().collection(collection_name).get();
    const elements = [];
    snapshot.forEach((doc) => {
        elements.push({
            id: doc.id,
            data: doc.data(),
        });
    });
    return elements;
};
const getDocumentMap = async(collection_name) => {
    const snapshot = await getFirestore().collection(collection_name).get();
    const elements = {};
    snapshot.forEach((doc) => {
        elements[doc.id] = doc.data();
    });
    return elements;
};

// Get All Recipes
export const recipes = onRequest(async (req, res) => {
    if (req.method !== 'GET') {
        res.status(403).send('Forbidden');
        return;
    }

    const recipePromise = getDocuments('recipes');
    const categoryPromise = getDocumentMap('categories');
    const retDocuments = await Promise.all([recipePromise, categoryPromise]);
    const recipeDocs = retDocuments[0];
    const categories = retDocuments[1];
    const retVal = recipeDocs.map(recipe => ({
        id: recipe.id,
        name: recipe.data.name,
        from: recipe.data.from,
        serves: recipe.data.serves,
        ingredientCount: recipe.data.ingredients.length,
        category: categories[recipe.data.category.id].name,
    }));
    return res.json(retVal);
});

// Get Recipe
export const recipe = onRequest(async (req, res) => {
    if (req.method !== 'GET') {
        res.status(403).send('Forbidden');
        return;
    }
    if (!isNonEmptyString(req.query.id)) {
        res.status(404).send();
        return;
    }

    const doc = await getFirestore().collection('recipes').doc(req.query.id).get();
    if (doc.exists) {

        const getUnitText = async (ing) => {
            if(ing.unit) {
                const unitData = await resolveReference(ing.unit);
                return unitData.abbreviation || unitData.name;
            }
            return undefined;
        };
        const getIngredientName = async (ing) => {
            if(ing.ingredient) {
                const ingData = await resolveReference(ing.ingredient);
                return ingData.name;
            }
            return undefined;
        };
        const getCategoryName = async (recipe) => {
            if(recipe.category) {
                const categoryData = await resolveReference(recipe.category);
                return categoryData.name;
            }
            return undefined;
        };
        const resolveIngredient = async (ing) => {
            const ingValues = await Promise.all([getIngredientName(ing), getUnitText(ing)]);
            const ingObj = Object.assign({}, ing,
                { name: ingValues[0] },
                { unit: ingValues[1] },
            );
            delete ingObj.ingredient;
            return ingObj;
        };

        const recipeData = doc.data();
        const recipePromises = [getCategoryName(recipeData)];
        if(recipeData.ingredients) {
            recipeData.ingredients.forEach((ing) => { recipePromises.push(resolveIngredient(ing)); });
        }
        const values = await Promise.all(recipePromises);
        return res.json({
            id: doc.id,
            data: Object.assign({}, recipeData, { category: values.shift(), ingredients: values }),
        });
    } else {
        return res.status(404).send();
    }
});