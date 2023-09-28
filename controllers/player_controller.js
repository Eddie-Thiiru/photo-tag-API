const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const World = require("../models/world");
const Player = require("../models/player");

exports.player_list_get = asyncHandler(async (req, res, next) => {
  const world = await World.findOne({ worldName: req.params.name }).exec();
  const players = await Player.find({ world: world._id }).exec();

  res.send(players);
});

exports.player_create_post = [
  body("playerName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Player name must not be empty")
    .isLength({ max: 30 })
    .escape()
    .withMessage("Player name must not exceed 30 characters"),
  body("scoreTime").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // ***** CONFIRM IF WORLD IS CORRECT
    const player = new Player({
      playerName: req.body.playerName,
      scoreTime: req.body.scoreTime,
      timestamp: new Date(),
      world: req.body.world._id,
    });

    if (!errors.isEmpty()) {
      res.send(errors);
      return;
    }

    await player.save();

    res.send(player);
  }),
];
