const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID: {type: String,
    unique: true}
});

const User =  mongoose.model('User', userSchema);
