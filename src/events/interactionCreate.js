"use strict";

const { Permissions, CommandInteraction } = require("discord.js");
const { getKeyByValue } = require("../util/util.js");
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

    let missingPermissions = [];
    /* Permission check */
    cmdFile.permissions.userPermissions.forEach(flag =>
    {
        if (!interaction.member.permissions.has(flag))
            missingPermissions.push(getKeyByValue(Permissions.FLAGS, flag));
    });

    /* Run the command and logg if the user is not missing any permissions. */
    if (missingPermissions.length == 0)
        cmdFile.run(interaction).catch(err => console.error(err));
    else interaction.reply({ content: `You are missing the following permissions.\n \`${missingPermissions.toString()}\``, ephemeral: true });
};