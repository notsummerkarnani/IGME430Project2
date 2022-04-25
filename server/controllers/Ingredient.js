const nodeFetch = require('node-fetch');
const models = require('../models');
const IngredientModel = require('../models/Ingredient');

const { Ingredient } = models;

const makerPage = (req, res) => res.render('app');

const makeIngredient = async(req, res) => {
    if (!req.body.name || !req.body.category || !req.body.quantity) {
        return res.status(400).json({ error: 'Name, category and quantity are all required!' });
    }

    const ingredientData = {
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        measurement: req.body.measurement,
        owner: req.session.account._id,
    };

    try {
        const newIngredient = new Ingredient(ingredientData);
        await newIngredient.save();
        return res.status(201).json({
            name: newIngredient.name,
            category: newIngredient.category,
            quantity: newIngredient.quantity,
            measurement: newIngredient.measurement,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Ingredient already exists!' });
        }
        return res.status(400).json({ error: 'An error occured' });
    }
};
const getIngredients = (req, res) => IngredientModel.findByOwner(
    req.session.account._id,
    (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occured!' });
        }
        return res.json({ ingredients: docs });
    },
);

const findRecipe = async(req, res) => {
        IngredientModel.findByID(req.body._id, async(err, docs) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ error: 'An error occured!' });
                    }

                    const mealJSON = [];

                    const url = new URL(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${docs[0].name}`);

                    const response = await nodeFetch(url);
                    const jsonData = await response.json();


                    if (jsonData.meals === null) {
                        return res.status(400).json({ error: 'No recipes found' });
                    }


                    for (const meal of jsonData.meals) {

                        const url2 = new URL(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);

                        const response2 = await nodeFetch(url2);
                        const jsonData2 = await response2.json();

                        const ingredients = [];

                        // format ingredients and measurements into an array
                        for (let i = 0; i < 20; i++) {
                            if (jsonData2.meals[0][`strIngredient${i + 1}`] && jsonData2.meals[0][`strMeasure${i + 1}`]) {
                                ingredients.push(`${jsonData2.meals[0][`strMeasure${i + 1}`]} ${jsonData2.meals[0][`strIngredient${i + 1}`]}`);
        }
    }

    //add data to object we are returning
    mealJSON.push({
      name: jsonData2.meals[0].strMeal,
      category: jsonData2.meals[0].strCategory,
      ingredients,
      instructions: jsonData2.meals[0].strInstructions,
      thumbnail: jsonData2.meals[0].strMealThumb,
      youtube: jsonData2.meals[0].strYoutube,
      id: jsonData2.meals[0].idMeal,
      _id: req.body._id
    });
                      
                    
  }

    return res.status(200).json(mealJSON);
    });
};

const clearIngredients = (req, res) => {
  IngredientModel.findByOwnerAndDelete(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured!' });
    }
    return res.json({ ingredients: docs });
  });
};

const deleteIngredient = (req, res) => {
  console.log(req.body._id);

  IngredientModel.findByIDandDelete(req.body._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured!' });
    }
    return res.json({ ingredients: docs });
  });
};

module.exports = {
  makerPage,
  makeIngredient,
  getIngredients,
  clearIngredients,
  deleteIngredient,
  findRecipe,
};