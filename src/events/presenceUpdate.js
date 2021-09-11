"use strict";

const { PresenceUpdateStatus } = require("discord-api-types/v9");
const { Presence } = require("discord.js");
const Guild = require("../models/guilds.js");
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
        /* Bot went online. */
        if (newPresence.status == PresenceUpdateStatus.Online)
        {
            const channel = await newPresence.guild.channels.fetch(guildQuery.channel);
            channel.send({
                content: `<@&${guildQuery.role}>`,
                embeds: [{
                    title: "Bot went online!",
                    description: `Looks like ${newPresence.member.displayName} (${newPresence.user.tag}) just went online!`,
                    thumbnail: {
                        url: newPresence.user.avatarURL({ format: "png", size: 1024 }),
                    },
                    timestamp: new Date()
                }]
            });
        }

        /* Bot went offline. */
        else if (newPresence.status == PresenceUpdateStatus.Offline || newPresence.status == PresenceUpdateStatus.Invisible)
        {
            const channel = await newPresence.guild.channels.fetch(guildQuery.channel);
            channel.send({
                content: `<@&${guildQuery.role}>`,
                embeds: [{
                    title: "Bot went offline!",
                    description: `Looks like ${newPresence.member.displayName} (${newPresence.user.tag}) just went offline!`,
                    thumbnail: {
                        url: newPresence.user.avatarURL({ format: "png", size: 1024 }),
                    },
                    timestamp: new Date()
                }]
            });
        }
    }
};
