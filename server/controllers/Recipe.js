const nodeFetch = require('node-fetch');

const baseURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const recipePage = (req, res) => res.render('recipe');

const searchRecipe = async(req, res) => {
    const url = new URL(`${baseURL}${req.body.name}`);

    const response = await nodeFetch(url);
    const jsonData = await response.json();

    let mealJSON = [];

    jsonData.meals.map(meal => {
        let ingredients = [];

        //format ingredients and measurements into an array
        for (let i = 0; i < 20; i++) {
            if (!meal[`strIngredient${i+1}`] || !meal[`strMeasure${i+1}`]) {

            } else {
                ingredients.push(meal[`strMeasure${i+1}`] + " " + meal[`strIngredient${i+1}`]);
            }
        }

        //add data to object we are returning
        mealJSON.push({
            name: meal.strMeal,
            category: meal.strCategory,
            ingredients: ingredients,
            instructions: meal.strInstructions,
            thumbnail: meal.strMealThumb,
            youtube: meal.strYoutube,
            id: meal.idMeal
        });
    })
    return res.status(200).json(mealJSON);
};

module.exports = {
    searchRecipe,
    recipePage,
};