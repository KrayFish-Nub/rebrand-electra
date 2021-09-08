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

/* Load commands. */
console.log('\x1b[36m%s\x1b[0m', "Loading Commands . . .");
/* Get an array of all files in the commands folder. */
const commands = getAllFiles(path.join(__dirname, "../commands"));
if (commands.length <= 0)
    console.log('\x1b[31m\x1b[0m', 'NO COMMANDS FOUND');
    //console.log("[ERROR]: No commands found.");
else
{
    /* Iterate every file in the array and require it. Also map it to the commands collection. */
    commands.forEach((file, i) =>
    {
        const props = require(`${file}`);
        console.log('\x1b[32m%s\x1b[0m', `${++i}. Command: ${file.split('\\').pop().split('/').pop()} loaded!`);
        client.commands.set(props.data.name, props);
    });
}


/* Load events. */
console.log('\x1b[36m%s\x1b[0m', "Loading Events . . .");
//console.log("Loading events..");
/* Get an array of all files in the events folder. */
const events = getAllFiles(path.join(__dirname, "../events"));
if (events.length <= 0)
    console.log('\x1b[31m\x1b[0m', 'NO EVENTS FOUND');
    //console.log("No events found.");
else
{
    /* Iterate every file in the array and require it. Also register every event. */
    events.forEach((file, i) =>
    {
        const event = require(`${file}`);
        console.log('\x1b[32m%s\x1b[0m', `${++i}. Event: ${file.split('\\').pop().split('/').pop()} loaded!`);
        if (event.data.once)
            client.once(event.data.name, (...args) => event.run(...args));
        else client.on(event.data.name, (...args) => event.run(...args));
    });
}

client.login(process.env.BOT_TOKEN);


module.exports = client;