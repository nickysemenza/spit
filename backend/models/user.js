
let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let userSchema = new Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: false},
        gamesPlayed: {type: Number, required: false},
        gamesWon: {type: Number, required: false}
    });

module.exports = mongoose.model('User', userSchema);
