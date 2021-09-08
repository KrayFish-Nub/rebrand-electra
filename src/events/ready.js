"use strict";

const { Client } = require("discord.js");

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
    console.log("\x1b[33m%s\x1b[0m", "✅ [INFO]: Bot is running.");
};