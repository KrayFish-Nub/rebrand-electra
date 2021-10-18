"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Permissions } = require("discord.js");
const Guild = require("../../models/guilds.js");
const Bot = require("../../models/bots.js");
const bot = require("../../models/bots.js");


module.exports.cooldown = {
    length: 10000, /* in ms */
    users: new Set()
};

/**
 * Adds a bot to the watchlist.
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (interaction, utils) =>
{
    try
    {
        await interaction.deferReply({ ephemeral: true });

        /* Check if guild is setup. */
        const guildQuery = await Guild.findOne({ id: interaction.guildId });
        if (guildQuery)
        {
            
            /* Check if bot is in the db */
            let botQuery = await Bot.findOne({ id: bot.id });
            if (!botQuery)
                return; 


            botQuery.guilds.findOneAndDelete(guildQuery._id);
            guildQuery.bots.findOneAndDelete(botQuery._id);
            await botQuery.save();
            await guildQuery.save();

            await interaction.editReply({ content: `Successfully removed Setup`, ephemeral: true });
        }
        else await interaction.editReply({ content: "You need to setup your Guild first.", ephemeral: true });
    }
    catch (err)
    {
        return Promise.reject(err);
    }
};

module.exports.permissions = {
    clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
    userPermissions: [Permissions.FLAGS.ADMINISTRATOR]
};

module.exports.data = new SlashCommandBuilder()
    .setName("reset")
    .setDescription("reset")
    
