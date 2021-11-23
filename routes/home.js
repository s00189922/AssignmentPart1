const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello everyone from Aisling using nodemon!'))

router.get('/Adopt', (req, res) =>
  res.send('Hello everyone, this is an app for rehoming beautiful dogs to dog lovers around the world!'));


module.exports = router;