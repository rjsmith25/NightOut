// connects to database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbURI = 'mongodb://localhost/NightOut';

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
})

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
})

function gracefulShutdown(msg, callback){
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  })
}

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
