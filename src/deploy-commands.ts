import { Client, Intents } from 'discord.js';
import { readdir } from 'fs/promises';
import { config } from "dotenv"
import { ICommand } from './types';
config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
    console.log('Starting deploy commands');
    // Get all commands from commands folder
    const cmdFiles = (await readdir(`${__dirname}/commands`)).filter(file => file.endsWith(".js"));
    // Get guild(s)
    const guild = client.guilds.cache.get("904657379516383292") || await client.guilds.fetch("904657379516383292");
    const command = guild.commands;
    // Reset all commands
    await command.set([]);
    // Update all commands
    let pushCmd: Promise<any>[] = []
    for (const file of cmdFiles) {
        const cmd = require(`${__dirname}/commands/${file}`) as ICommand;
        pushCmd.push(command.create(cmd.data.toJSON() as any));
    }
    await Promise.all(pushCmd);
    console.log("Close the connection");
    client.destroy();
    process.exit(0);
});

client.login(process.env.DISCORD_TOKEN)