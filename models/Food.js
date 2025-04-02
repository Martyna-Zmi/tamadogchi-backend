const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 1},
    hungerPoints: {type: Number, required: true, min: 1}
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;