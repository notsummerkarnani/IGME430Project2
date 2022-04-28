const nodeFetch = require('node-fetch');
const config = require('../config.js');

const recipePage = (req, res) => res.render('recipe');

// finds recipes by recipe name
const searchRecipe = async (req, res) => {
  const url = new URL(config.connections.nameEndpoint + req.body.name);

  const response = await nodeFetch(url);
  const jsonData = await response.json();

  const mealJSON = [];

  jsonData.meals.map((meal) => {
    const ingredients = [];

    // format ingredients and measurements into an array
    for (let i = 0; i < 20; i++) {
      if (meal[`strIngredient${i + 1}`] && meal[`strMeasure${i + 1}`]) {
        ingredients.push(`${meal[`strMeasure${i + 1}`]} ${meal[`strIngredient${i + 1}`]}`);
      }
    }

    // add data to object we are returning
    mealJSON.push({
      name: meal.strMeal,
      category: meal.strCategory,
      ingredients,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      youtube: meal.strYoutube,
      id: meal.idMeal,
    });

    return 0;
  });
  return res.status(200).json(mealJSON);
};

module.exports = {
  searchRecipe,
  recipePage,
};
