import { Client, Intents } from 'discord.js';
import { readdir } from 'fs/promises';
import { config } from "dotenv"
import { ICommand } from './types';
config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

let commands: { [key: string]: ICommand } = {}

client.once('ready', async () => {
	console.log('Bot started');
	const cmdFiles = (await readdir(`${__dirname}/commands`)).filter(file => file.endsWith(".js"));
	for (const file of cmdFiles) {
        const cmd = require(`${__dirname}/commands/${file}`) as ICommand;
        commands[cmd.data.name] = cmd
    }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const {commandName} = interaction;
	if (!(commandName in commands)) return;
	await commands[commandName].execute(interaction);
});

client.login(process.env.DISCORD_TOKEN);