const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorldSchema = new Schema({
  worldName: { type: String },
});

module.exports = mongoose.model("World", WorldSchema);
