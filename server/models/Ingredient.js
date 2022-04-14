const mongoose = require('mongoose');
const _ = require('underscore');

let IngredientModel = {};

const setName = (name) => _.escape(name).trim();

const IngredientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
        unique: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    measurement: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },

});

IngredientSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    category: doc.category,
    quantity: doc.quantity,
    measurement: doc.measurement,
});

IngredientSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        // convert the string ownerId to an object id
        owner: mongoose.Types.ObjectId(ownerId),
    };
    return IngredientModel.find(search).select('name category quantity measurement').lean().exec(callback);
};

IngredientSchema.statics.findByOwnerAndDelete = (ownerId, callback) => {
    const search = {
        // convert the string ownerId to an object id
        owner: mongoose.Types.ObjectId(ownerId),
    };
    return IngredientModel.deleteMany(search).lean().exec(callback);
};

IngredientSchema.statics.findByIDandDelete = (ingredientID, callback) => {
    console.log(ingredientID);
    const search = {
        _id: mongoose.Types.ObjectId(ingredientID),
    };
    return IngredientModel.deleteOne(search).lean().exec(callback);
};

IngredientModel = mongoose.model('Ingredient', IngredientSchema);

module.exports = IngredientModel;