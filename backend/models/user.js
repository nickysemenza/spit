
let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let userSchema = new Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        gamesPlayer: {type: Number, required: true},
        gamesWon: {type: Number, required: true}
    });

module.exports = mongoose.model('User', userSchema);
