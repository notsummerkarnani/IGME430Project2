const { json } = require('express/lib/response');
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
const getIngredients = (req, res) => IngredientModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured!' });
    }
    return res.json({ ingredients: docs });
});

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
    deleteIngredient
};