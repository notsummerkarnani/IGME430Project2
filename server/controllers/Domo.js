const models = require('../models');
const DomoModel = require('../models/Domo');

const { Domo } = models;

const makerPage = (req, res) => res.render('app');

const makeDomo = async(req, res) => {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({ error: 'Name, age and level are all required!' });
    }

    const domoData = {
        name: req.body.name,
        age: req.body.age,
        level: req.body.level,
        owner: req.session.account._id,
    };

    try {
        const newDomo = new Domo(domoData);
        await newDomo.save();
        return res.status(201).json({ name: newDomo.name, age: newDomo.age, level: newDomo.level });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Domo already exists!' });
        }
        return res.status(400).json({ error: 'An error occured' });
    }
};
const getDomos = (req, res) => DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured!' });
    }
    return res.json({ domos: docs });
});

const clearDomos = (req, res) => {
    DomoModel.findByOwnerAndDelete(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occured!' });
        }
        return res.json({ domos: docs });
    });
};
module.exports = {
    makerPage,
    makeDomo,
    getDomos,
    clearDomos,
};