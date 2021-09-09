"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, Permissions } = require("discord.js");
const path = require("path");

module.exports.cooldown = {
    length: 0, /* in ms */
    users: new Set()
};

/**
 * Runs ping command.
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (interaction, utils) =>
{
    delete require.cache[path.join(__dirname, "../../deployCommands.js")];
    require("../../deployCommands.js");
    interaction.reply({ content: "Redeployed all commands.", ephemeral: true });
};

module.exports.permissions = {
    clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
    userPermissions: [Permissions.FLAGS.ADMINISTRATOR]
};

module.exports.data = new SlashCommandBuilder()
    .setName("deploycommands")
    .setDescription("Deploys all commands.");
