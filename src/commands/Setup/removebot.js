"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, Permissions } = require("discord.js");
const Guild = require("../../models/guilds.js");
const Bot = require("../../models/bots.js");
const { db } = require("../../models/guilds.js");

module.exports.cooldown = {
  length: 10000 /* in ms */,
  users: new Set(),
};

/**
 * Adds a bot to the watchlist.
 * @param {CommandInteraction} interaction The Command Interaciton
 * @param {any} utils Additional util
 */
module.exports.run = async (interaction, utils) => {
  try {
    await interaction.deferReply({ ephemeral: true });

    /* Check if guild is already setup. */
    const guildQuery = await Guild.findOne({ id: interaction.guildId });
    if (guildQuery) {
      /* Check if the user is a bot. */
      const bot = interaction.options.getUser("bot", true);
      if (!bot.bot) {
        await interaction.editReply({
          content: "You did not provide an actual Bot!",
          ephemeral: true,
        });
        return;
      }

      /* Check if bot is in th db */
      let botQuery = await Bot.findOne({ id: bot.id });
      if (!botQuery)
        await interaction.editReply({
          content:
            "This Bot is not connected yet, add it to be able to remove it!",
          ephemeral: true,
        });

      /* Find the Bot and delelte it*/
      Bot.findOneAndDelete(
        {
          id: bot.id,
          unique: true,
          ref: "Bot",
        },
        (err) => {
          if (err) console.log(err);
        }
      );

      await botQuery.save();
      await guildQuery.save();

      await interaction.editReply({
        content: `Successfully removed ${bot} from the watchlist.`,
        ephemeral: true,
      });
    } else
      await interaction.editReply({
        content:
          "You need to setup your Guild first before you can remove a bot from the watchlist.",
        ephemeral: true,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.permissions = {
  clientPermissions: [Permissions.FLAGS.SEND_MESSAGES],
  userPermissions: [Permissions.FLAGS.ADMINISTRATOR],
};

module.exports.data = new SlashCommandBuilder()
  .setName("removebot")
  .setDescription("Removes a bot from the watchlist.")
  .addUserOption((option) =>
    option
      .setName("bot")
      .setDescription("Select a bot to remove from the watchlist.")
      .setRequired(true)
  );
