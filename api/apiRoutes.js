// setup all api routes here
const express = require('express');
const barRouter = require('./bar');

const apiRouter = express.Router();

apiRouter.use('/bar', barRouter);

module.exports = apiRouter;
