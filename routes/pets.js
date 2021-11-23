const mongoose = require('mongoose');
const express = require('express');

// use object destructuring

const { Pet, validate } = require('../models/pets');

const router = express.Router();


router.post('/pets', async (req, res) => {

  let result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }


  let pet = new Pet(req.body);

  try {

    pet = await pet.save();
    res.location(`/${pet._id}`)
      .status(201)
      .json(pet);
  }
  catch {
    res.status(500).json(result.error);
  }


});

router.get('/', async (req, res) => {

  const { _id, name, year_born, breed, price } = req.query;

  let filter = {}
5

if (_id) {
  filter._id = { $regex: `${_id}`, $options: 'i' };
}

  if (name) {
    filter.name = { $regex: `${name}`, $options: 'i' };
  }

  // the year filter first needs to parse the year
  const yearNumber = parseInt(year_born)

  if (!isNaN(yearNumber)) {
    filter.year_born = yearNumber
  }

  if (breed) {
    filter.breed = { $regex: `${breed}`, $options: 'i' };
  }

  if (!isNaN(price)) {
    filter.price = price
  }
  //let limitNumber = parseInt(limit);

 // if (isNaN(limitNumber)) {
 //   limitNumber = 0
 // }

  // let pageSizeNumber = parseInt(pagesize);

  // if (isNaN(pageSizeNumber)) {
  //   pageSizeNumber = 0
  // }
  // let pageNumberNumber = parseInt(pagenumber);

  // if (isNaN(pageNumberNumber)) {
  //   pageNumberNumber = 1
  // }

  console.table(filter);

  const pets = await Pet.
    find(filter).
    // limit(pageSizeNumber).
    // sort({_id : 1, name : 2, year_born : -1, breed: -2, price: -3}).
    sort({price : 1, year_born: -1, name: 1, breed: -1}).
    // skip((pageNumberNumber -1)*pageSizeNumber).
    select('price year_born name breed')

    // find(filter).
    // limit(pageSizeNumber).
    // sort({price : 1, year_written : -1}).
    // skip((pageNumberNumber -1)*pageSizeNumber)

    // limit(price).
    // sort({price : 1, year_born : -1}).
    // skip((price -1)*price)

  res.json(pets);
})

//router.get('/:id', (req,res)=> {
 // const pet = await Pet.findById(req.params.id);
 // res.json(pet);
//})

router.get('/:id', async (req, res) => {

  try {

    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.json(pet);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird');
  }

})


router.delete('/:id', async (req, res) => {

  try {
    const pet = await Pet.findByIdAndDelete(req.params.id)
    res.send(pet)
  }
  catch {
    res.status(404).json(`pet with that ID ${req.params.id} was not found`);
  }

})

router.put('/:id', async (req, res) => {

  //const id = req.params.is;

  const result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  console.log(req.body);

  try {

    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (pet) {
      res.json(pet);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird'); //non valid ID
  }

})



module.exports = router;