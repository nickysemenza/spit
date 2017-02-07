/**
 * Created by nickschneider on 2/7/17.
 */

let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let gameSchema = new Schema({
  url: {type: String, required: true, unique: true},
  players: {type: [String], required: true},
  totalMoves: {type: Number},
  winner: {type: String},
  startingPiles: {type: [Number], required: true},
  moves: {type: [
    {
      player: {type: String, required: true},
      card: {type: Number, required: true},
      location: {type: String, required: true}
    }
  ], required: true},
  state: {type: {}}
});

module.exports = mongoose.model('Game', gameSchema);
