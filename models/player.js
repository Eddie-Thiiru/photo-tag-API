const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  playerName: { type: String, minLength: 1, maxLength: 20, required: true },
  scoreTime: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  world: { type: ObjectId, ref: "World", required: true },
});

module.exports = mongoose.model("Player", PlayerSchema);
