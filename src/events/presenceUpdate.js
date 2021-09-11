"use strict";

const { Presence } = require("discord.js");

module.exports.data = {
    name: "presenceUpdate",
    once: false,
};

/**
 * Handle the presenceUpdate event.
 * @param {Presence} oldPresence The presence before the update, if one at all
 * @param {Presence} newPresence The presence after the update
 */

module.exports.run = async (oldPresence, newPresence) =>
{
    if (!oldPresence || !oldPresence.user.bot) return;

    if (oldPresence.status == newPresence.status) return;

    const guildQuery = await Guild.findOne({ id: oldPresence.guild.id });
    if (guildQuery)
    {
        const channel = guildQuery.channelId;
        const role = guildQuery.role;
    }

    // Bot offline
    if (oldSt == "offline")
    {
        oldPresence.user.guild.channels.cache.get(channel).send(`<@&${role}>`, {
            embed: {
                title: "Bot went online!",
                description: `Looks like ${oldPresence.user.bot} (${oldPresence.user.tag}) just went back online! `,
                thumbnail: {
                    url: oldPresence.user.avatarURL({ format: "png", size: 1024 }),
                },
                timestamp: new Date(Date.now()),
            },
        });
    }
    // Bot online
    else if (newSt == "offline")
    {
        oldPresence.user.guild.channels.cache.get(channel).send(`<@&${role}>`, {
            embed: {
                title: "Bot went offline!",
                description: `${oldPresence.user.bot} (${oldPresence.user.tag}) just went offline!`,
                thumbnail: {
                    url: oldPresence.user.avatarURL({ format: "png", size: 1024 }),
                },
                timestamp: new Date(Date.now()),
            },
        });
    } else return;
};
