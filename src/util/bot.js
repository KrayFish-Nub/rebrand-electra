"use strict";

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Client, Intents, Collection } = require("discord.js");
const { getAllFiles } = require("./util.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
});
client.commands = new Collection();

/* Load events */
console.log("Loading events..");

const events = getAllFiles(path.join(__dirname, "../events"));
if (events.length <= 0)
    console.log("No events found.");
else
{
    events.forEach((file, i) =>
    {
        const event = require(`${file}`);
        console.log(`${++i}. Event: ${file.split('\\').pop().split('/').pop()} loaded!`);
        if (event.data.once)
            client.once(event.data.name, (...args) => event.run(...args));
        else client.on(event.data.name, (...args) => event.run(...args));
    });
}

client.login(process.env.BOT_TOKEN);


module.exports = client;