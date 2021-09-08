"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, Permissions } = require("discord.js");
/**
 * Runs ping command.
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (interaction, utils) =>
{
    interaction.reply({ content: "Pong", ephemeral: true }).catch(err => { return Promise.reject(err) });
};

module.exports.permissions = {
    userPermissions: [Permissions.FLAGS.MANAGE_MESSAGES]
}

module.exports.data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong, I guess.");
