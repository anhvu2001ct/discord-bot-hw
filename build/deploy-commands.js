"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const promises_1 = require("fs/promises");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.once('ready', async () => {
    console.log('Starting deploy commands');
    // Get all commands from commands folder
    const cmdFiles = (await (0, promises_1.readdir)(`${__dirname}/commands`)).filter(file => file.endsWith(".js"));
    // Get guild(s)
    const guild = client.guilds.cache.get("904657379516383292") || await client.guilds.fetch("904657379516383292");
    const command = guild.commands;
    // Reset all commands
    await command.set([]);
    // Update all commands
    let pushCmd = [];
    for (const file of cmdFiles) {
        const cmd = require(`${__dirname}/commands/${file}`);
        pushCmd.push(command.create(cmd.data.toJSON()));
    }
    await Promise.all(pushCmd);
    console.log("Close the connection");
    client.destroy();
    process.exit(0);
});
client.login(process.env.DISCORD_TOKEN);
