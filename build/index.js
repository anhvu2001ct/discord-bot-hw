"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const promises_1 = require("fs/promises");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
let commands = {};
client.once('ready', async () => {
    console.log('Bot started');
    const cmdFiles = (await (0, promises_1.readdir)(`${__dirname}/commands`)).filter(file => file.endsWith(".js"));
    for (const file of cmdFiles) {
        const cmd = require(`${__dirname}/commands/${file}`);
        commands[cmd.data.name] = cmd;
    }
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    if (!(commandName in commands))
        return;
    await commands[commandName].execute(interaction);
});
client.login(process.env.DISCORD_TOKEN);
