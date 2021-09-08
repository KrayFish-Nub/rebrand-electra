"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
/**
 * Runs ping command.
 * @param {Client} client The client
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (client, interaction, utils) =>
{
    interaction.reply({ content: "Pong", ephemeral: true }).catch(err => { return Promise.reject(err) });
};


module.exports.data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong, I guess.");
