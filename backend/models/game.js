/**
 * Created by nickschneider on 2/7/17.
 */

let mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

let gameSchema = new Schema({
    id: {type: Number, required: false, unique: true},
    url: {type: String, required: false, unique: true},
    players: [{type: Schema.Types.ObjectId, ref: 'User' , required: false}],
    totalMoves: {type: Number},
    winner: {type: Schema.Types.ObjectId, ref: 'User'},
    state: [{}]
});

module.exports = mongoose.model('Game', gameSchema);
