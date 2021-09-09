"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, Permissions } = require("discord.js");

module.exports.cooldown = {
    length: 10000, /* in ms */
    users: new Set()
};

/**
 * Runs ping command.
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (interaction, utils) =>
{
    interaction.reply({ content: "Pong", ephemeral: false }).catch(err => { return Promise.reject(err) });
};

module.exports.permissions = {
    clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
    userPermissions: [Permissions.FLAGS.SEND_MESSAGES]
};

module.exports.data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong, I guess.");