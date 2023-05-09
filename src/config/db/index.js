const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Connect to DB failed: ', error);
  }
}

module.exports = {
  connect
};