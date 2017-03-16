/**
 * Created by nickschneider on 2/7/17.
 */

let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let gameSchema = new Schema({
    id: {type: Number, required: true},
    players: [{type: String , required: false}],
    totalMoves: {type: Number},
    winner: {type: String, required: false},
    state: [{}]
});

module.exports = mongoose.model('Game', gameSchema);


/*let gameSchema = new Schema({
    id: {type: Number, required: true},
    players: [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    totalMoves: {type: Number},
    winner: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    state: [{}]
});*/
