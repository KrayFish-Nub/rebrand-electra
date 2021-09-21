"use strict";
const { Presence, MessageEmbed, Interaction } = require("discord.js");
const client = require(".././util/bot");

module.exports.data = {
    name: "ping",
    once: false,
};

/**
 * Handle the presenceUpdate event.
 *  @param {Client} client
 *  @param {any} utils
 */

module.exports.run = async (interaction, client, utils) =>
{
    try
    {
      
        const pingembed = new MessageEmbed()
        .setTitle("Electra")
        .setDescription("👋🏼 Hey! I'm **Electra!**\nMy prefix here is `*`\nIf you need any help regarding the Bot / Service, feel free to join the [Support Server](https://discord.gg/yszNJjN4Q9)\n\n**Thanks** for using me!")
       
        if(message.mentions.has(client.id)) {
            console.log(client)
            interaction.reply({ embeds: [pingembed], ephemeral: true });
        }
    }
    catch (err)
    {
        return Promise.reject(err);
    }
};
