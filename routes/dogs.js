const express = require('express');
const router = express.Router();
router.use(express.json());
const Dog = require("../models/Dog");
const Food = require("../models/Food");

//get all dogs
router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find()
        .populate('likedFoods')
        .exec()
    res.json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get dog by id
router.get('/:id', async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id)
        .populate('likedFoods')
        .exec()
    res.json(dog);
  } catch (error) {
    res.status(404).json({ error: "dog not found" });
  }
});

//post dog
router.post('/', async (req, res) => {
  try{
    const { name, birthDate, lastFed, likedFoods, currentHunger, maxHunger, currentHappiness, maxHappiness } = req.body;
    const newDog = new Dog({ name,  birthDate, lastFed, likedFoods, currentHunger, maxHunger, currentHappiness, maxHappiness });
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  }
  catch (error){
    res.status(400).json({ errors: error });
  }
});

//delete a dog
router.delete('/:id', async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) {
      return res.status(404).json({ message: 'dog not found' });
    }
    res.json({ message: 'dog deleted successfully', deletedResource: deletedDog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//feed a dog - put
router.put('/feed/:id/:foodId', async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const food = await Food.findById(foodId).exec();
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    const dog = await Dog.findById(req.params.id).exec();
    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    //for finding out liked food
    const newLikedFoods = [... dog.likedFoods];
    if(dog.likedFoods.length < 3 && !dog.likedFoods.includes(foodId)){
      const chanceToDiscover = Math.floor(Math.random() * 3); //1 in 3 chance
      if(chanceToDiscover===1){
        newLikedFoods.push(foodId);
      }
    }

    const today = new Date();

    const newHunger = Math.min(dog.currentHunger + food.hungerPoints, dog.maxHunger);
    const updatedDog = await Dog.findByIdAndUpdate(
        req.params.id,
        { $set: { currentHunger: newHunger, lastFed: today.toISOString().split('T')[0], likedFoods: newLikedFoods } },
        { new: true, runValidators: true }
    );

    res.json(updatedDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//amuse a dog - put
router.put('/amuse/:id/:amount', async (req, res) => {
  try {
    const amount = parseInt(req.params.amount);
    const dog = await Dog.findById(req.params.id).exec();

    const newHappiness = Math.min(dog.currentHappiness + amount, dog.maxHappiness);

    const updatedDog = await Dog.findByIdAndUpdate(
        req.params.id,
        { $set: { ["currentHappiness"]: newHappiness } },
        { new: true, runValidators: true }
    );
    if (!updatedDog) {
      return res.status(404).json({ message: "Dog not found" });
    }
    res.json(updatedDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
