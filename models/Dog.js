const mongoose = require('mongoose');
//TODO: add happiness
const dogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true, min: 0},
    lastFed: {type: Date, required: true},
    likedFoods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true}],
    maxHunger: {type: Number, min: 2, required: true},
    currentHunger: {type: Number, min: 0, required: true},
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
