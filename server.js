//use local environment variable from .env file
require('dotenv').load();

// get modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api');

// start up database connections
require('./api/db');

// setup express app
const app = express();

// set server port number
app.set('port', process.env.Port || 3000);

// serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request bodies add to req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up api routes
app.use('/api', api);

// send react application
app.get('*',(req,res) => {
	res.sendFile(path.join(__dirname,'index.html'));
})

// start server
const server = app.listen(app.get('port'),() => {
  console.log(`listening on port: ${server.address().port}`);
})
