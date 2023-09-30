const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const World = require("../models/world");
const Player = require("../models/player");

exports.player_list_get = asyncHandler(async (req, res, next) => {
  const players = await Player.find(
    { worldName: req.params.name },
    "playerName scoreTime timestamp"
  )
    .sort({ timestamp: 1 })
    .exec();

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

    const player = new Player({
      playerName: req.body.playerName,
      scoreTime: req.body.scoreTime,
      timestamp: new Date(),
      worldName: req.params.name,
      world: "",
    });

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()[0].msg });
    } else {
      const world = await World.findOne({ worldName: req.params.name }).exec();

      // add world ID to player
      player.world = world._id;

      await player.save();

      res.send(player);
    }
  }),
];
