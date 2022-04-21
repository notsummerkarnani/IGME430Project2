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

                    const url = new URL(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${docs[0].name}`);

                    const response = await nodeFetch(url);
                    const jsonData = await response.json();

                    const mealJSON = [];

                    if (jsonData.meals === null) {
                        return res.status(400).json({ error: 'No recipes found' });
                    }
                    jsonData.meals.map((meal) => {
                                const ingredients = [];

                                // format ingredients and measurements into an array
                                for (let i = 0; i < 20; i++) {
                                    if (meal[`strIngredient${i + 1}`] !== null && meal[`strMeasure${i + 1}`] !== null) {
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
      _id: req.body._id
    });

    return 0;
    });
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