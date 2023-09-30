const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  playerName: { type: String, minLength: 1, maxLength: 30, required: true },
  scoreTime: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  world: { type: Schema.Types.ObjectId, ref: "World", required: true },
  worldName: { type: String, required: true },
});

module.exports = mongoose.model("Player", PlayerSchema);
