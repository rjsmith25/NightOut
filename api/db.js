// connects to database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbUrl = 'mongodb://localhost/NightOut';

if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.MONGODB_URL;
}
mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbUrl}`);
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
