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
    console.log("Bot is running.");
};