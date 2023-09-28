const asyncHandler = require("mongoose");

const Character = require("../models/player");

exports.character_list_get = asyncHandler(async (req, res, next) => {
  const characters = await Character.find({ world: req.params.id }).exec();

  res.send(characters);
});
