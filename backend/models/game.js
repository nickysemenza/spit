/**
 * Created by nickschneider on 2/7/17.
 */

let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let gameSchema = new Schema({
    url: {type: String, required: true, unique: true},
    players: [{type: ObjectId, ref: 'User' , required: true}],
    totalMoves: {type: Number},
    winner: {type: ObjectId, ref: 'User'},
    moves: [{type: {
     player: {type: String, required: true},
      card: {type: Number, required: true},
      location: {type: String, required: true}
    }, required: true}],
    state: {type: {}}
});

module.exports = mongoose.model('Game', gameSchema);
