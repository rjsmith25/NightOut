const express = require('express');
const barController = require('./bar.controller');

const barRouter = express.Router();

barRouter.get('/',barController.getAllBars);
barRouter.post('/', barController.createBar);

module.exports = barRouter;
