const nodeFetch = require('node-fetch');
const models = require('../models');
const IngredientModel = require('../models/Ingredient');
const config = require('../config.js');

const { Ingredient } = models;

const makerPage = (req, res) => res.render('app');

// adds ingredient to db
const makeIngredient = async (req, res) => {
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
    // console.log(err);
    return res.status(400).json({ error: 'An error occured' });
  }
};

// updates ingredient in db if its there otherwise calls makeingredient
const updateIngredient = (req, res) => IngredientModel.findByName(
  req.session.account._id,
  req.body.name,
  async (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }
    if (!docs) {
      makeIngredient(req, res);
      return 0;
    }

    const updatedIngredient = docs;
    if (req.body.measurement === updatedIngredient.measurement
            && req.body.category === updatedIngredient.category) {
      updatedIngredient.quantity = parseInt(updatedIngredient.quantity, 10)
                + parseInt(req.body.quantity, 10);
      await updatedIngredient.save();
      return res.status(200).json(updatedIngredient);
    }
    return res.status(400).json({ error: 'Measurement and Category of updated ingredient must match the stored measurement!' });
  },
);

// gets ingredients from db
const getIngredients = (req, res) => IngredientModel.findByOwner(
  req.session.account._id,
  (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }
    return res.status(200).json({ ingredients: docs });
  },
);

// finds recipes based on ingredient
const findRecipe = async (req, res) => {
  IngredientModel.findByID(req.body._id, async (err, docs) => {
    if (err) {
      /// /console.log(err);
      return res.status(400).json({ error: err });
    }

    const mealJSON = [];

    const url = new URL(config.connections.ingredientEndpoint + docs[0].name);

    const response = await nodeFetch(url);
    const jsonData = await response.json();

    if (jsonData.meals === null) {
      return res.status(400).json({ error: 'No recipes found' });
    }

    const urls = [];

    jsonData.meals.map((meal) => {
      urls.push(new URL(config.connections.idEndpoint + meal.idMeal));
      return 0;
    });

    const response2 = await Promise.all(urls.map((u) => nodeFetch(u)));
    const jsonData2 = await Promise.all(response2.map((r) => r.json()));

    jsonData2.map((obj) => {
      const iterator = obj.meals[0];

      const ingredients = [];

      // format ingredients and measurements into an array
      for (let i = 0; i < 20; i++) {
        if (iterator[`strIngredient${i + 1}`]
                                        && iterator[`strMeasure${i + 1}`]) {
          ingredients.push(`${iterator[`strMeasure${i + 1}`]} ${iterator[`strIngredient${i + 1}`]}`);
        }
      }

      // add data to object we are returning
      mealJSON.push({
        name: iterator.strMeal,
        category: iterator.strCategory,
        ingredients,
        instructions: iterator.strInstructions,
        thumbnail: iterator.strMealThumb,
        youtube: iterator.strYoutube,
        id: iterator.idMeal,
        _id: req.body._id,
      });

      return 0;
    });

    return res.status(200).json(mealJSON);
  });
};

// deletes all ingredients from db
const clearIngredients = (req, res) => {
  IngredientModel.findByOwnerAndDelete(req.session.account._id, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json({ ingredients: docs });
  });
};

// deletes one ingredient from db
const deleteIngredient = (req, res) => {
  IngredientModel.findByIDandDelete(req.body._id, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json({ ingredients: docs });
  });
};

module.exports = {
  makerPage,
  makeIngredient,
  updateIngredient,
  getIngredients,
  clearIngredients,
  deleteIngredient,
  findRecipe,
};
