"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, Permissions } = require("discord.js");
const { cyan, green, red } = require("colors/safe");
const { getAllFiles } = require("../../util/util.js");
const path = require('path');


module.exports.cooldown = {
    length: 0, /* in ms */
    users: new Set()
};

/**
 * Reloads a certain command.
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (interaction, utils) =>
{
    /* Load commands. */
    console.log(cyan("Loading Commands . . ."));
    /* Get an array of all files in the commands folder. */
    const commands = getAllFiles(path.join(__dirname, "../"));
    if (commands.length <= 0)
        console.log(red("NO COMMANDS FOUND"));
    else
    {
        /* Iterate every file in the array and require it. Also map it to the commands collection. */
        commands.forEach((file, i) =>
        {
            delete require.cache[file];
            const props = require(`${file}`);
            console.log(green(`${++i}. Command: ${file.split('\\').pop().split('/').pop()} loaded!`));
            interaction.client.commands.set(props.data.name, props);
        });
    }
    interaction.reply({ content: "Done.", ephemeral: true });
};

module.exports.permissions = {
    clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
    userPermissions: [Permissions.FLAGS.ADMINISTRATOR]
};

module.exports.data = new SlashCommandBuilder()
    .setName("reloadcommands")
    .setDescription("Reloads all commands.");