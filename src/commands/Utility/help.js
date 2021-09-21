"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Permissions, MessageEmbed } = require("discord.js");

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
    try
    {
        const embed = new MessageEmbed()
        .setTitle("Electra - Help")
        .setDescription(`
        **Setup - Commands**
        \`setup\`- Setup Channel & Role for Electra
        \`addbot\`- Add a Bot Electra should track
        \`removebot\`- Remove a Bot Electra should'nt track anymore\n
        **Utility - Commands**
        \`help\`- Electras help Command
        \`ping\`- Electras current latency
        \`help\`- Electras help Command
        \`support\`- Electras Support Servers Link
        \`uptime\`- Since when is Electra online?
        
        Electra Development
        `)
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
    }
    catch (err)
    {
        return Promise.reject(err);
    }
};

module.exports.permissions = {
    clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
    userPermissions: [Permissions.FLAGS.SEND_MESSAGES]
};

module.exports.data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help Command");
