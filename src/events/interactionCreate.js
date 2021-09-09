"use strict";

const { Permissions, CommandInteraction } = require("discord.js");
const { getKeyByValue, msToMinAndSec } = require("../util/util.js");
const { red } = require("colors/safe");
module.exports.data =
{
    name: "interactionCreate",
    once: false,
};

/**
 * Handle the clients interactionCreate event.
 * @param {CommandInteraction} interaction The interaction that triggered the event.
 */
module.exports.run = async (interaction) =>
{
    /* Only handle command interactions. */
    if (!interaction.isCommand()) return;
    const command = interaction.commandName.toLowerCase();
    let cmdFile;
    if (interaction.client.commands.has(command))
        cmdFile = interaction.client.commands.get(command);
    else return; /* Return if command doesn't exist. */

    /* Check if command is on cooldown. */
    if (cmdFile.cooldown.users.has(interaction.member.id))
    {
        interaction.reply({ content: `:x: | You can only use this command every ${msToMinAndSec(cmdFile.cooldown.length)} minutes.`, ephemeral: true });
        return;
    }

    let missingClientPermissions = [],
        missingUserPermissions = [];

    /* Permission check */
    cmdFile.permissions.clientPermissions.forEach(flag =>
    {
        if (!interaction.guild.me.permissions.has(flag))
            missingClientPermissions.push(getKeyByValue(Permissions.FLAGS, flag));
    });

    if (missingClientPermissions.length != 0)
    {
        interaction.reply({ content: `:x: | I am missing the following permissions.\n \`${missingClientPermissions.toString()}\``, ephemeral: true });
        return;
    }

    /* Permission check */
    cmdFile.permissions.userPermissions.forEach(flag =>
    {
        if (!interaction.member.permissions.has(flag))
            missingUserPermissions.push(getKeyByValue(Permissions.FLAGS, flag));
    });

    /* Run the command and logg if the user is not missing any permissions. */
    if (missingUserPermissions.length == 0)
    {
        cmdFile.run(interaction).catch(err => console.error(red(err)));
        cmdFile.cooldown.users.add(interaction.member.id);
        setTimeout(() =>
        {
            cmdFile.cooldown.users.delete(interaction.member.id);
        }, cmdFile.cooldown.length);
    }
    else interaction.reply({ content: `:x: | You are missing the following permissions.\n \`${missingUserPermissions.toString()}\``, ephemeral: true });
};