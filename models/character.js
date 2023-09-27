const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  characterName: { type: String, required: true },
  positionX: { type: Number, required: true },
  positionY: { type: Number, required: true },
  world: { type: ObjectId, ref: "World", required: true },
});

module.exports = mongoose.module("Character", CharacterSchema);
