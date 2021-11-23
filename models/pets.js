//This will hold the schema for the pet and any wanted validation code 
const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

//setting up schema
const petSchema = new mongoose.Schema({
    name: String,
    year_born: Number,
    breed: String,
    price: Number,
    quantity: Number
})

const Pet = mongoose.model('Pet', petSchema);

function validatePet(pet) {
    const schema = Joi.object({
        name:  Joi.string(), 
        breed: Joi.string(), 
        year_born:  Joi.number().integer().min(1990),
        quantity: Joi.number().integer().min(0),
        price: Joi.number()
    })
    return schema.validate(pet);
}

exports.Pet = Pet;
exports.validate = validatePet;