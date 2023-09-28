const express = require("express");
const router = express.Router();

const character_controller = require("../controllers/character_controller");
const player_controller = require("../controllers/player_controller");

// GET request for characters
router.get("/:name", character_controller.character_list_get);

// GET request for leaderboard players
router.get("/leaderboard/:name", player_controller.player_list_get);

// POST request for new leaderboard player
router.post("/leaderboard/:name", player_controller.player_create_post);

module.exports = router;
