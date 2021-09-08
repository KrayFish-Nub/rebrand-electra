"use strict";

/* Script to deploy commands. */

const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { getAllFiles } = require("./util/util.js");

const local = true; /* Change to false to deploy global commands */

const clientId = "885211446382837781"; /* Change clientId */
const guildId = "885212846667993118"; /* Change guildId (for local commands) */
const commands = [];

const commandFiles = getAllFiles(path.join(__dirname, "./commands"));
for (const file of commandFiles)
{
    const command = require(`${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
(async () =>
{
    try
    {
        console.log("Started refreshing application (/) commands.");
        await rest.put(
            (local ? Routes.applicationGuildCommands(clientId, guildId) : Routes.applicationCommands(clientId)),
            { body: commands },
        ).then((c) =>
        {
            console.log("Successfully reloaded application (/) commands.");
            process.exit(0);
        });
    } catch (err)
    {
        console.error(err);
        return Promise.reject(err);
    }
})();