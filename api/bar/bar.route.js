const express = require('express');
const barController = require('./bar.controller');

const barRouter = express.Router();

barRouter.get('/', barController.getAllBars);
barRouter.post('/', barController.createBar);
barRouter.post('/:barid', barController.addBarAttendee);
barRouter.delete('/:barid', barController.deleteBar);
barRouter.delete('/:barid/attendee/:attendeeid', barController.deleteBarAttendee);

module.exports = barRouter;
