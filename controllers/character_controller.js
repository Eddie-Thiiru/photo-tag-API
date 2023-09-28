const asyncHandler = require("express-async-handler");

const World = require("../models/world");
const Character = require("../models/character");

exports.character_list_get = asyncHandler(async (req, res, next) => {
  const world = await World.findOne({ worldName: req.params.name }).exec();
  const characters = await Character.find({ world: world._id }).exec();

  res.send(characters);
});
