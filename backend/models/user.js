
let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let userSchema = new Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: false},
        gamesPlayed: {type: Number, default: 0},
        gamesWon: {type: Number, default: 0}
    });

module.exports = mongoose.model('User', userSchema);
