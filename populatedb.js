#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const World = require("./models/world");
const Character = require("./models/character");
const Player = require("./models/player");

const worlds = [];
const characters = [];
const players = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createWorlds();
  await createCharacters();
  await createPlayers();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function worldCreate(index, worldName) {
  const world = new World({
    worldName: worldName,
  });

  await world.save();
  worlds[index] = world;
  console.log(`Added ${worldName}`);
}

async function characterCreate(index, name, positionX, positionY, world) {
  const character = new Character({
    characterName: name,
    positionX: positionX,
    positionY: positionY,
    world: world,
  });

  await character.save();
  characters[index] = character;
  console.log(`Added ${name}`);
}

async function playerCreate(index, name, scoreTime, timestamp, world) {
  const player = new Player({
    playerName: name,
    scoreTime: scoreTime,
    timestamp: timestamp,
    world: world,
  });

  await player.save();
  players[index] = player;
  console.log(`Added ${name}`);
}

async function createWorlds() {
  console.log("Adding worlds");
  await Promise.all([
    worldCreate(0, "prehisoria"),
    worldCreate(1, "isord"),
    worldCreate(2, "memesupreme"),
  ]);
}

async function createCharacters() {
  console.log("Adding characters");
  await Promise.all([
    characterCreate(0, "Mario", 415, 155, worlds[0]),
    characterCreate(1, "Blastoise", 100, 900, worlds[0]),
    characterCreate(2, "Crono", 1120, 1005, worlds[0]),
    characterCreate(3, "Gandalf", 735, 1490, worlds[1]),
    characterCreate(4, "Shrek", 475, 440, worlds[1]),
    characterCreate(5, "Genie", 1390, 1195, worlds[1]),
    characterCreate(6, "Waldo", 425, 1180, worlds[2]),
    characterCreate(7, "Rick", 1400, 1635, worlds[2]),
    characterCreate(8, "Ed", 1415, 1060, worlds[2]),
  ]);
}

async function createPlayers() {
  console.log("Adding Players");
  await Promise.all([
    playerCreate(0, "test1", 2000, new Date(), worlds[0]),
    playerCreate(1, "test2", 3000, new Date(), worlds[1]),
    playerCreate(2, "test3", 4000, new Date(), worlds[1]),
    playerCreate(3, "test4", 5000, new Date(), worlds[2]),
    playerCreate(4, "test5", 6000, new Date(), worlds[2]),
    playerCreate(5, "test6", 7000, new Date(), worlds[2]),
  ]);
}
