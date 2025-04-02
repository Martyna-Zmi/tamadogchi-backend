const express = require('express');
const router = express.Router();
router.use(express.json());
const Food = require("../models/Food");

//get all foods
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find().exec()
        res.json(foods);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get food by id
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).exec()
        res.json(food);
    } catch (error) {
        res.status(404).json({ error: "food not found" });
    }
});

//post food
router.post('/', async (req, res) => {
    try{
        const { name, price, hungerPoints } = req.body;
        const newFood = new Food({ name, price, hungerPoints });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    }
    catch (error){
        res.status(400).json({ errors: error });
    }
});

module.exports = router;
