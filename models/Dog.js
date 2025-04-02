const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    variant: {type: Number, required: true, min:1},
    birthDate: { type: Date, required: true},
    lastFed: {type: Date, required: true},
    likedFoods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true}],
    maxHunger: {type: Number, min: 1, max: 10, required: true},
    currentHunger: {type: Number, min: 0, max: 10, required: true},
    maxHappiness: {type: Number, min: 1, max: 10, required: true},
    currentHappiness: {type: Number, min: 1, max: 10, required: true}
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
