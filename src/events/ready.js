"use strict";

const { Client } = require("discord.js");
const { yellow } = require("colors/safe");

module.exports.data =
{
    name: "ready",
    once: true,
};

/**
 * Handle the clients ready event.
 * @param {Client} client The client that triggered the event.
 */
module.exports.run = async (client) =>
{
    console.log(yellow("✅ [INFO]: Bot is running."));
};